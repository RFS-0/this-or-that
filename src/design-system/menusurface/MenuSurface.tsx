import { createEffect, createSignal, onCleanup, onMount, ParentProps, Signal } from "solid-js"
import { Elevation } from "../elevation/Elevation"
import { DefaultFocusState } from "../menu/Menu";
import { Corner, CornerBit, cssClasses, numbers } from "./constants";
import { AutoLayoutMeasurements, MenuDistance, MenuPoint } from "./types";
import './styles/base-styles.css'

export type MenuSurfaceProps = {
  open: Signal<boolean>;
  anchor: HTMLElement;
  maxHeight?: number;
  corner?: Corner;
  quickOpen?: boolean;
  absolute?: boolean;
  x?: number;
  fixed?: boolean;
  y?: number;
  stayOpenOnBodyClick?: boolean;
  skipRestoreFocus?: boolean;
  defaultFocus?: DefaultFocusState
  fullWidth?: boolean;
  flipMenuHorizontally?: boolean;
  anchorMargin?: MenuDistance;
  position?: MenuPoint
} & ParentProps

type MenuSurfaceAnimation = {
  openAnimationEndTimerId: number
  closeAnimationEndTimerId: number
  animationRequestId: number
}

export const MenuSurface = (props: MenuSurfaceProps) => {
  const position: MenuPoint = { x: 0, y: 0 };
  const anchorMargin: MenuDistance = { top: 0, right: 0, bottom: 0, left: 0 };
  let corner = props.corner || Corner.BOTTOM_END;
  let openBottomBias = 0;
  let absolute = props?.absolute || false;
  let fixed = false;
  let isHorizontallyCenteredOnViewport = false;

  let menuSurface!: HTMLDivElement
  let onBodyClickBound: (e: MouseEvent) => void
  let previouslyFocused: HTMLElement | Element | null = null;

  let animation: MenuSurfaceAnimation = {
    openAnimationEndTimerId: 0,
    closeAnimationEndTimerId: 0,
    animationRequestId: 0
  }

  const [open, setOpen] = props.open

  const [style, setStyle] = createSignal({
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    'max-height': '0px',
    'transform-origin': '',
  })

  const saveFocus = () => {
    previouslyFocused = document.activeElement
  }

  const restoreFocus = () => {
    if (!previouslyFocused) {
      return;
    }

    if ('focus' in previouslyFocused) {
      previouslyFocused.focus();
    }
  }

  const anchorDimensions = () => props?.anchor.getBoundingClientRect() || null;

  const autoLayoutmeasurements: () => AutoLayoutMeasurements = () => {
    let anchorRect = anchorDimensions();
    const bodySize = {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    }
    const viewportSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    }; const windowScroll = {
      x: window.pageXOffset,
      y: window.pageYOffset,
    }
    if (!anchorRect) {
      // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
      anchorRect = {
        top: position.y,
        right: position.x,
        bottom: position.y,
        left: position.x,
        width: 0,
        height: 0,
      } as any;
      // tslint:enable:object-literal-sort-keys
    }

    return {
      anchorSize: anchorRect!,
      bodySize,
      surfaceSize: { width: menuSurface.getBoundingClientRect().width, height: menuSurface.getBoundingClientRect().height },
      viewportDistance: {
        // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
        top: anchorRect!.top,
        right: viewportSize.width - anchorRect!.right,
        bottom: viewportSize.height - anchorRect!.bottom,
        left: anchorRect!.left,
        // tslint:enable:object-literal-sort-keys
      },
      viewportSize,
      windowScroll,
    };
  }

  const hasBit = (corner: Corner, bit: CornerBit) => Boolean(corner & bit);

  /**
   * Computes the corner of the anchor from which to animate and position the
   * menu surface.
   *
   * Only LEFT or RIGHT bit is used to position the menu surface ignoring RTL
   * context. E.g., menu surface will be positioned from right side on TOP_END.
   */
  const computeOriginCorner = () => {
    const { viewportDistance, anchorSize, surfaceSize } = autoLayoutmeasurements();
    const { MARGIN_TO_EDGE } = numbers;

    const isAnchoredToBottom = hasBit(corner, CornerBit.BOTTOM);

    let availableTop;
    let availableBottom;
    if (isAnchoredToBottom) {
      availableTop = viewportDistance.top - MARGIN_TO_EDGE + anchorMargin.bottom;
      availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE - anchorMargin.bottom;
    } else {
      availableTop = viewportDistance.top - MARGIN_TO_EDGE + anchorMargin.top;
      availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE + anchorSize.height - anchorMargin.top;
    }

    const isAvailableBottom = availableBottom - surfaceSize.height > 0;
    if (!isAvailableBottom && availableTop > availableBottom + openBottomBias) {
      // Attach bottom side of surface to the anchor.
      corner = corner | CornerBit.BOTTOM;
    }

    const hasRightBit = hasBit(corner, CornerBit.RIGHT) || hasBit(corner, CornerBit.RIGHT);

    // Whether surface attached to right side of anchor element.
    let isAnchoredToRight = false;

    // Anchored to right
    isAnchoredToRight = hasRightBit;

    let availableLeft: number;
    let availableRight: number;
    if (isAnchoredToRight) {
      availableLeft = viewportDistance.left + anchorSize.width + anchorMargin.right;
      availableRight = viewportDistance.right - anchorMargin.right;
    } else {
      availableLeft = viewportDistance.left + anchorMargin.left;
      availableRight = viewportDistance.right + anchorSize.width - anchorMargin.left;
    }

    const isAvailableLeft = availableLeft - surfaceSize.width > 0;
    const isAvailableRight = availableRight - surfaceSize.width > 0;
    const isOriginCornerAlignedToEnd = hasBit(corner, CornerBit.FLIP_RTL) && hasBit(corner, CornerBit.RIGHT);

    if (isAvailableRight && isOriginCornerAlignedToEnd || !isAvailableLeft && isOriginCornerAlignedToEnd) {
      // Attach left side of surface to the anchor.
      corner = corner ^ CornerBit.RIGHT;
    } else if (isAvailableLeft && isAnchoredToRight || (isAvailableLeft && !isAnchoredToRight && hasRightBit) || (!isAvailableRight && availableLeft >= availableRight)) {
      // Attach right side of surface to the anchor.
      corner = corner | CornerBit.RIGHT;
    }
    return corner;
  }


  /**
   * @param corner Origin corner of the menu surface.
   * @return Maximum height of the menu surface, based on available space. 0
   *     indicates should not be set.
   */
  const menuSurfaceMaxHeight = (corner: Corner) => {
    if (props?.maxHeight) {
      return props.maxHeight;
    }
    const { viewportDistance, anchorSize } = autoLayoutmeasurements();

    let maxHeight = 0;
    const isBottomAligned = hasBit(corner, CornerBit.BOTTOM);
    const isBottomAnchored = hasBit(corner, CornerBit.BOTTOM);
    const { MARGIN_TO_EDGE } = numbers;

    // When maximum height is not specified, it is handled from CSS.
    if (isBottomAligned) {
      maxHeight = viewportDistance.top + anchorMargin.top - MARGIN_TO_EDGE;
      if (!isBottomAnchored) {
        maxHeight += anchorSize.height;
      }
    } else {
      maxHeight = viewportDistance.bottom - anchorMargin.bottom +
        anchorSize.height - MARGIN_TO_EDGE;
      if (isBottomAnchored) {
        maxHeight -= anchorSize.height;
      }
    }

    return maxHeight;
  }

  const horizontalOriginOffset = (corner: Corner) => {
    const measurements = autoLayoutmeasurements();

    // isRightAligned corresponds to using the 'right' property on the surface.
    const isRightAligned = hasBit(corner, CornerBit.RIGHT);
    const avoidHorizontalOverlap = hasBit(corner, CornerBit.RIGHT);

    if (isRightAligned) {
      const rightOffset = avoidHorizontalOverlap ? measurements.anchorSize.width - anchorMargin.left : anchorMargin.right;

      // For hoisted or fixed elements, adjust the offset by the difference
      // between viewport width and body width so when we calculate the right
      // value (`adjustPositionForHoistedElement`) based on the element
      // position, the right property is correct.
      if (absolute || fixed) {
        return rightOffset - (measurements.viewportSize.width - measurements.bodySize.width);
      }

      return rightOffset;
    }

    return avoidHorizontalOverlap ? measurements.anchorSize.width - anchorMargin.right : anchorMargin.left;
  }

  const adjustPositionForHoistedElement = (position: Partial<MenuDistance>) => {
    const { windowScroll, viewportDistance, surfaceSize, viewportSize } = autoLayoutmeasurements();

    const props = Object.keys(position) as Array<keyof Partial<MenuDistance>>;

    for (const prop of props) {
      let value = position[prop] || 0;

      if (isHorizontallyCenteredOnViewport && (prop === 'left' || prop === 'right')) {
        position[prop] = (viewportSize.width - surfaceSize.width) / 2;
        continue;
      }

      // Hoisted surfaces need to have the anchor elements location on the page
      // added to the position properties for proper alignment on the body.
      value += viewportDistance[prop];

      // Surfaces that are absolutely positioned need to have additional
      // calculations for scroll and bottom positioning.
      if (!fixed) {
        if (prop === 'top') {
          value += windowScroll.y;
        } else if (prop === 'bottom') {
          value -= windowScroll.y;
        } else if (prop === 'left') {
          value += windowScroll.x;
        } else {  // prop === 'right'
          value -= windowScroll.x;
        }
      }

      position[prop] = value;
    }
  }

  const verticalOriginOffset = (corner: Corner) => {
    const { anchorSize } = autoLayoutmeasurements();
    const isBottomAligned = hasBit(corner, CornerBit.BOTTOM);
    const avoidVerticalOverlap = hasBit(corner, CornerBit.BOTTOM);

    let y = 0;
    if (isBottomAligned) {
      y = avoidVerticalOverlap ? anchorSize.height - anchorMargin.top : - anchorMargin.bottom;
    } else {
      y = avoidVerticalOverlap ? (anchorSize.height + anchorMargin.bottom) :
        anchorMargin.top;
    }
    return y;
  }

  const autoposition = () => {
    // Compute measurements for autoposition methods reuse.
    const measurements = autoLayoutmeasurements();
    const computedCorner = computeOriginCorner();
    const maxMenuSurfaceHeight = menuSurfaceMaxHeight(computedCorner);
    const verticalAlignment = hasBit(computedCorner, CornerBit.BOTTOM) ? 'bottom' : 'top';
    let horizontalAlignment = hasBit(computedCorner, CornerBit.RIGHT) ? 'right' : 'left';
    const horizontalOffset = horizontalOriginOffset(computedCorner);
    const verticalOffset = verticalOriginOffset(computedCorner);
    const { anchorSize, surfaceSize } = measurements;

    const position: Partial<MenuDistance> = {
      [horizontalAlignment]: horizontalOffset,
      [verticalAlignment]: verticalOffset,
    };

    // Center align when anchor width is comparable or greater than menu
    // surface, otherwise keep corner.
    if (anchorSize.width / surfaceSize.width > numbers.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
      horizontalAlignment = 'center';
    }

    // If the menu-surface has been hoisted to the body, it's no longer relative
    // to the anchor element
    if (absolute || fixed) {
      adjustPositionForHoistedElement(position);
    }

    setStyle({
      ...style(),
      'transform-origin': `${horizontalAlignment} ${verticalAlignment}`,
      left: 'left' in position ? `${position.left}px` : '',
      right: 'right' in position ? `${position.right}px` : '',
      top: 'top' in position ? `${position.top}px` : '',
      bottom: 'bottom' in position ? `${position.bottom}px` : '',
      "max-height": maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '',
    })

    // If it is opened from the top then add is-open-below class
    if (!hasBit(computedCorner, CornerBit.BOTTOM)) {
      menuSurface.classList.add(cssClasses.IS_OPEN_BELOW);
    }
  }

  const doOpen = () => {
    saveFocus();
    if (props?.quickOpen) {
      setOpen(true);
      menuSurface.classList.add(cssClasses.OPEN);
      autoposition();
    } else {

      menuSurface.classList.add(cssClasses.ANIMATING_OPEN);
      animation.animationRequestId = requestAnimationFrame(() => {
        autoposition();

        menuSurface.classList.add(cssClasses.OPEN);
        animation.openAnimationEndTimerId = window.setTimeout(() => {
          animation.openAnimationEndTimerId = 0;
          menuSurface.classList.remove(cssClasses.ANIMATING_OPEN);
        }, numbers.TRANSITION_OPEN_DURATION);
      });
    }
  }

  const doClose = () => {
    menuSurface.classList.add(cssClasses.ANIMATING_CLOSED);
    animation.animationRequestId = requestAnimationFrame(() => {
      menuSurface.classList.remove(cssClasses.OPEN);
      animation.openAnimationEndTimerId = window.setTimeout(() => {
        animation.openAnimationEndTimerId = 0;
        menuSurface.classList.remove(cssClasses.ANIMATING_CLOSED);
      }, numbers.TRANSITION_CLOSE_DURATION);
    });
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    const isEscape = key === 'Escape';
    if (isEscape) {
      setOpen(false)
    }
  }

  const onBodyClick = (evt: MouseEvent) => {
    if (props?.stayOpenOnBodyClick) {
      return;
    }
    const path = evt.composedPath();
    if (path.indexOf(menuSurface) === -1) {
      setOpen(false);
    }
  }

  const registerBodyClick = () => {
    onBodyClickBound = onBodyClick.bind(menuSurface);
    // capture otherwise listener closes menu after quick menu opens
    document.body.addEventListener('click', onBodyClickBound, { passive: true, capture: true });
  }

  const deregisterBodyClick = () => {
    document.body.removeEventListener('click', onBodyClickBound, { capture: true });
  }

  onMount(() => {
    createEffect(() => {
      if (open()) {
        doOpen();
        registerBodyClick()
      } else {
        deregisterBodyClick()
        doClose()
        restoreFocus()
      }
    })
  })

  return (
    <div
      ref={menuSurface}
      class={
        `
        base-menu-surface
        md3-menu-surface 
        ${props.fixed ? 'md3-menu-surface--fixed' : ''}
        ${props.fullWidth ? 'md3-menu-surface--fullwidth' : ''}
        `
      }
      style={style()}
      onKeyDown={handleKeyDown}
    >
      <Elevation shadow></Elevation>
      {props.children}
    </div >
  )
}
