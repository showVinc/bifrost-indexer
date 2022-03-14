// Auto-generated , DO NOT EDIT
import { Entity, FunctionPropertyNames } from "@subql/types";
import assert from "assert";

type PointHistoryProps = Omit<
  PointHistory,
  NonNullable<FunctionPropertyNames<PointHistory>>
>;

export class PointHistory implements Entity {
  roundindex: number;
  block: bigint;
  account: string;
  point: number;
  constructor(id: string) {
    this.id = id;
  }

  public id: string;

  public field1: number;

  public field2?: string;

  public field3?: bigint;

  public field4?: Date;

  public field5?: boolean;

  async save(): Promise<void> {
    let id = this.id;
    assert(id !== null, "Cannot save PointHistory entity without an ID");
    await store.set("PointHistory", id.toString(), this);
  }
  static async remove(id: string): Promise<void> {
    assert(id !== null, "Cannot remove PointHistory entity without an ID");
    await store.remove("PointHistory", id.toString());
  }

  static async get(id: string): Promise<PointHistory | undefined> {
    assert(
      id !== null && id !== undefined,
      "Cannot get PointHistory entity without an ID"
    );
    const record = await store.get("PointHistory", id.toString());
    if (record) {
      return PointHistory.create(record as PointHistoryProps);
    } else {
      return;
    }
  }

  static create(record: PointHistoryProps): PointHistory {
    assert(typeof record.id === "string", "id must be provided");
    let entity = new PointHistory(record.id);
    Object.assign(entity, record);
    return entity;
  }
}
