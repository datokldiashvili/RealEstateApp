import { IPropertyBase } from './iproperty-base';

export class Property implements IPropertyBase {
  Id!: number | null;
  SellRent!: number | null;
  BHK!: number | null;
  PropertyType!: string;
  FurnishType!: string;
  Name!: string;
  City!: number | null;
  Country!: number | null;
  Price!: number | null;
  Security?: string | undefined;
  Maintenance?: string | undefined;
  BuiltArea!: number | null;
  CarpetArea?: string | undefined;
  Floor?: number | undefined;
  TotalFloors?: number | undefined;
  Address!: string;
  Landmark?: string | undefined;
  ReadyToMove!: string;
  AvailableFrom?: string | undefined;
  AOP?: number | undefined;
  GatedCommunity?: number | undefined;
  MainEntrance?: number | undefined;
  Description?: string | undefined;
  Image?: string | undefined;
  PostedOn?: string | undefined;
}
