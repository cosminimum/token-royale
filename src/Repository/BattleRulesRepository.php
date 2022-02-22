<?php

namespace App\Repository;

use App\Model\BattleRulesModel;

class BattleRulesRepository extends AbstractRepository
{
    private const BATTLE_RULES_KEY = 'battle_rules';

    /**
     * @return BattleRulesModel|null
     */
    public function findBattleRules(): ?BattleRulesModel
    {
        $battleRulesJson = $this->cache->get(self::BATTLE_RULES_KEY);
        if (empty($battleRulesJson)) {
            throw new \RuntimeException("no battle rules found");
        }

        return $this->modelSerializer->deserialize($battleRulesJson, BattleRulesModel::class, 'json');
    }
}