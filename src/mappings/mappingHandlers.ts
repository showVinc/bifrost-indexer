import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { StarterEntity } from "../types";
import { PointHistory } from "../types/models/PointHistory";
import { Balance } from "@polkadot/types/interfaces";
import { PointReward, getRoundIndex } from "../constants";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  let number = block.block.header.number.toNumber();
  let findAuthor = false;
  let extrinsics = block.block.extrinsics;
  for (let i = 0; i < extrinsics.length; i++) {
    const {
      isSigned,
      meta,
      method: { args, method, section },
    } = extrinsics[i];
    if (section == "authorInherent") {
      if (args && args.length > 0) {
        //logger.info(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
        let id = number.toString();
        let pointHistory = new PointHistory(id);
        pointHistory.roundindex = getRoundIndex(number) + 1;
        pointHistory.block = BigInt(number);
        logger.info(
          `authorInherent: block ${number} args: ${JSON.stringify(args)}`
        );
        pointHistory.account = args[0].toString();
        pointHistory.point = PointReward.PointPerBlock;
        await pointHistory.save();
        findAuthor = true;
      } else {
        logger.warn(`authorInherent: args is empty at block ${number}`);
      }
    }
  }
  if (findAuthor === false) {
    let author = await api.query.authorInherent.author();
    if (author) {
      let id = number.toString();
      let pointHistory = new PointHistory(id);
      pointHistory.roundindex = getRoundIndex(number) + 1;
      pointHistory.block = BigInt(number);
      logger.info(
        `query authorInherent.author: block ${number} author: ${JSON.stringify(
          author
        )}`
      );
      pointHistory.account = author.toString();
      pointHistory.point = PointReward.PointPerBlock;
      await pointHistory.save();
      findAuthor = true;
    }
  }

  if (findAuthor === false) {
    logger.error(`query authorInherent.author failed: block ${number}}`);
  }
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  // const {
  //   event: {
  //     data: [account, balance],
  //   },
  // } = event;

  const {
    event: { method, section },
    block: {
      block: { header },
    },
    idx,
    extrinsic,
  } = event;

  const eventType = `${section}/${method}`;
  const { method: extMethod, section: extSection } =
    extrinsic?.extrinsic.method || {};

  logger.info(`eventType: ${eventType}`);

  //Retrieve the record by its ID
  // const record = await StarterEntity.get(
  //   event.block.block.header.hash.toString()
  // );
  // record.field2 = account.toString();
  // //Big integer type Balance of a transfer event
  // record.field3 = (balance as Balance).toBigInt();
  // await record.save();
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  const record = await StarterEntity.get(
    extrinsic.block.block.header.hash.toString()
  );
  // logger.info(`extrinsic: ${extrinsic.block.block.header.hash.toString()}`);
  //Date type timestamp
  record.field4 = extrinsic.block.timestamp;
  //Boolean tyep
  record.field5 = true;
  await record.save();
}
