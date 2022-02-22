<?php

namespace App\Service;

use Predis\Client;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class CacheService
{
    private const REDIS_DSN_KEY = "redis_dsn";

    private Client $client;

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->client = new Client([
            $parameterBag->get(self::REDIS_DSN_KEY),
            ],
            [
                'persistent' => 1
            ]
        );
    }

    public function getClient(): Client
    {
        return $this->client;
    }
}