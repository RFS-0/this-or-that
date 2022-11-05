export interface BaseItem {
  title: string
  description: string
}
export interface IntendedItem extends BaseItem {}
export interface Item extends BaseItem {
  id: string
}
