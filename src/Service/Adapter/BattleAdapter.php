<?php

namespace App\Service\Adapter;

use App\Model\BattleModel;
use App\Model\TeamModel;
use App\Service\ModelSerializer;

class BattleAdapter
{
    /** @var ModelSerializer  */
    private ModelSerializer $modelSerializer;

    public function __construct(ModelSerializer $modelSerializer)
    {
        $this->modelSerializer = $modelSerializer;
    }

    public function adapt(string $battle): BattleModel
    {
        $battleData = json_decode($battle, TRUE);

        $teamAlpha = $this->modelSerializer->denormalize($battleData['teamAlpha'], TeamModel::class, 'array');
        $teamBeta = $this->modelSerializer->denormalize($battleData['teamBeta'], TeamModel::class, 'array');

        $battleModel = new BattleModel();
        $battleModel->setTeamAlpha($teamAlpha);
        $battleModel->setTeamBeta($teamBeta);
        $battleModel->setStatus($battleData['status']);
        $battleModel->setStart($battleData['start']);
        $battleModel->setEnd($battleData['end']);

        return $battleModel;
    }

}