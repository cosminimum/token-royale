<?php

namespace App\Repository;

use App\Service\CacheService;
use App\Service\ModelSerializer;
use Predis\Client;

class AbstractRepository
{
    protected Client $cache;
    protected ModelSerializer $modelSerializer;

    public function __construct(
        CacheService $cacheService,
        ModelSerializer $modelSerializer
    ) {
        $this->cache = $cacheService->getClient();
        $this->modelSerializer = $modelSerializer;
    }
}