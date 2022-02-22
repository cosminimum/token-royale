<?php

namespace App\Model;

class BattleModel
{
    private string $teamAlpha;
    private string $teamBeta;
    private string $salt;
    private string $start;
    private string $end;
    private string $status;
    private string $winner;

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

    public function getSalt(): string
    {
        return $this->salt;
    }

    public function setSalt(string $salt): void
    {
        $this->salt = $salt;
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

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }

    public function getWinner(): string
    {
        return $this->winner;
    }

    public function setWinner(string $winner): void
    {
        $this->winner = $winner;
    }
}