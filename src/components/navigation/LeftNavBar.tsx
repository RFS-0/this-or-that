import { useNavigate } from "@solidjs/router"
import { Component } from "solid-js"
import { Icon, StandardIconButton } from "../../design-system"
import { Label } from "../../design-system/typography/Label"

export type LeftNavBarProps = {
}

export const LeftNavBar: Component<LeftNavBarProps> = (_) => {
  const navigate = useNavigate()
  return (
    <div class="flex justify-center bg-surface py-f4">
      <div>
        <StandardIconButton
          color='primary'
          onClick={() => navigate('/import')}
          icon={
            <Icon><span class="material-symbols-outlined">input</span></Icon>
          }
        />
        <Label size='small'>Import</Label>

        <StandardIconButton
          color='primary'
          onClick={() => navigate('/prioritize')}
          icon={
            <Icon><span class="material-symbols-outlined">priority_high</span></Icon>
          }
        />
        <Label size='small'>Prioritize</Label>

        <StandardIconButton
          color='primary'
          onClick={() => navigate('/export')}
          icon={
            <Icon><span class="material-symbols-outlined">output</span></Icon>
          }
        />
        <Label size='small'>Export</Label>
      </div>
    </div>
  )
}
