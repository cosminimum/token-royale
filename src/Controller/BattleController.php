<?php

namespace App\Controller;

use App\Repository\BattleRepository;
use App\Repository\BattleRulesRepository;
use App\Service\BattleService;
use App\Service\ModelSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class BattleController extends AbstractController
{
    /** @var ModelSerializer */
    private $modelSerializer;

    public function __construct(ModelSerializer $modelSerializer)
    {
        $this->modelSerializer = $modelSerializer;
    }

    /** @Route(path="/fetch-battle-rules", name="fetch_battle_rules", options={"expose"=true}) */
    public function fetchBattleRules(BattleRulesRepository $battleRulesRepository)
    {
        $battleRules = $battleRulesRepository->findBattleRules();

        return (new JsonResponse())
            ->setContent($this->modelSerializer->serialize($battleRules, "json"));
    }

    /** @Route(path="/fetch-current-battle", name="fetch_current_battle", options={"expose"=true}) */
    public function fetchCurrentBattle(BattleRepository $battleRepository)
    {
        $currentBattle = $battleRepository->findCurrentBattle();
        return (new JsonResponse())
            ->setContent($this->modelSerializer->serialize($currentBattle, "json"));
    }

    /** @Route(path="/fetch-historical-battles", name="fetch_historical_battles", options={"expose"=true}) */
    public function fetchHistoricalBattles(BattleRepository $battleRepository)
    {
        $battles = $battleRepository->findHistoricalBattles();
        return (new JsonResponse())
            ->setContent($this->modelSerializer->serialize($battles, "json"));
    }

    /** @Route(path="/fetch-encoded-team/{address}/{team}", name="fetch_encoded_team", options={"expose"=true}) */
    public function fetchEncodedTeam(string $address, int $team, BattleService $battleService)
    {
        if (str_starts_with($address, "0x")) {
            $address = substr($address, 2);
        }

        return new JsonResponse($battleService->getEncodedTeam($address, $team));
    }

    /** @Route(path="/save-battle", name="save_battle", options={"expose"=true}) */
    public function saveBattle(
        Request $request,
        BattleService $battleService,
        BattleRepository $battleRepository
    ) {
        $battleService->save($request->getContent());

        return new JsonResponse($battleRepository->findCurrentBattle());
    }

}