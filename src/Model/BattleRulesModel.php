<?php

namespace App\Model;

class BattleRulesModel
{
    private string $teamAlpha;
    private string $teamBeta;
    private string $start;
    private string $end;

    public function getTeamAlpha(): string
    {
        return $this->teamAlpha;
    }

    public function setTeamAlpha(string $teamAlpha): void
    {
        $this->teamAlpha = $teamAlpha;
    }

    public function getTeamBeta(): string
    {
        return $this->teamBeta;
    }

    public function setTeamBeta(string $teamBeta): void
    {
        $this->teamBeta = $teamBeta;
    }

    public function getStart(): string
    {
        return $this->start;
    }

    public function setStart(string $start): void
    {
        $this->start = $start;
    }

    public function getEnd(): string
    {
        return $this->end;
    }

    public function setEnd(string $end): void
    {
        $this->end = $end;
    }
}
