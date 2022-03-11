export const ChronicleKey = 'ChronicleKey';
export const NominationActiontype = {
    "NOMINATIONTOTOP": "addedToTop",
    "NOMINATIONTOBOTTOM": "addedToBottom",
    "INCREASE": "increase",
    "DECREASE": "decrease",
    "LEFT": "left",
};
export const CollatorActiontype = {
    "JOINED": "joinedCollatorCandidates",
    "BONDMORE": "collatorBondedMore",
    "BONDLESS": "collatorBondedLess",
    "LEFT": "left",
};

export const PointReward = {
    "PointPerBlock": 20,
};
export const V1001_upgrade_blockNumber = 1052242;
export const V1001_round_start_at_blockNumber = 1052400;
export const V1001_round_start = 3509;
export const V1001_blockPerRound = 600;
export const Init_blockPerRound = 300;

export function getRoundIndex(blockNumber: number) {
    let roundIndex = 0;
    if (blockNumber < V1001_upgrade_blockNumber) {
        roundIndex = Math.floor(blockNumber / Init_blockPerRound);
    }
    else {
        if (blockNumber >= V1001_upgrade_blockNumber && blockNumber <= V1001_round_start_at_blockNumber) {
            roundIndex = V1001_round_start;
        }
        else {
            roundIndex = Math.floor((blockNumber - V1001_round_start_at_blockNumber) / V1001_blockPerRound) + V1001_round_start;
        }
    }
    logger.info(`getRoundIndex : ${blockNumber}=>${roundIndex}`);
    return roundIndex;
} 