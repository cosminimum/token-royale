<?php

namespace App\Repository;

use App\Model\BattleModel;

class BattleRepository extends AbstractRepository
{
    private const BATTLE_KEY = 'battles';

    private const HISTORICAL_MAX_BATTLES = 11; // todo: 11?

    public function findAll()
    {
        return;
    }

    /**
     * @return BattleModel|null
     */
    public function findCurrentBattle(): ?BattleModel
    {
        $currentBattleJson = $this->cache->lindex(self::BATTLE_KEY, 0);

        return $this->modelSerializer->deserialize($currentBattleJson, BattleModel::class, 'json');
    }

    /**
     * @return array
     */
    public function findHistoricalBattles(): array
    {
        $battleJsons = $this->cache->lrange(self::BATTLE_KEY, 1, self::HISTORICAL_MAX_BATTLES);

        $battles = [];
        foreach ($battleJsons as $battleJson) {
            $battles[] = $this->modelSerializer->deserialize($battleJson, BattleModel::class, 'json');;
        }

        return $battles;
    }

    /**
     * @param BattleModel $battle
     *
     * @return int
     */
    public function save(BattleModel $battle): int
    {
        $battleJson = $this->modelSerializer->normalize($battle, 'array');

        return $this->cache->lpush(self::BATTLE_KEY, $battleJson);
    }
}