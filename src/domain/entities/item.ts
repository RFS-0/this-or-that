export interface BaseItem {
  id: string
  title: string
  description: string
  rating: number
}
export interface IntendedItem extends BaseItem {}
export interface Item extends BaseItem {}
