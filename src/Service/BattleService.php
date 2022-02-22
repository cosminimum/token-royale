<?php

namespace App\Service;

use App\Model\BattleModel;
use App\Model\BattleRulesModel;
use App\Repository\BattleRepository;
use kornrunner\Keccak;

class BattleService
{
    private ModelSerializer $modelSerializer;
    private BattleRepository $battleRepository;

    public function __construct(
        ModelSerializer $modelSerializer,
        BattleRepository $battleRepository
    ) {
        $this->modelSerializer = $modelSerializer;
        $this->battleRepository = $battleRepository;
    }

    public function save(string $battle): void
    {
        /** @var BattleModel $battleModel */
        $battleModel = $this->modelSerializer->deserialize($battle, BattleModel::class, 'json');

        $battleModel->setSalt($this->generateSalt());

        $this->battleRepository->save($battleModel);
    }

    public function getEncodedTeam(string $address, int $team): string
    {
        /** @var BattleModel $currentBattle */
        $currentBattle = $this->battleRepository->findCurrentBattle();

        return Keccak::hash((string) $team . hex2bin($address) . $currentBattle->getSalt(), 256);
    }

    private function generateSalt(): string
    {
        return hash('sha256', time());
    }
}