<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class FrontController extends AbstractController
{

    /**
     * @Route(path="/", name="index")
     */
    public function index()
    {
        return $this->render('pages/index.html.twig');
    }

    /**
     * @Route(path="/battle", name="battle")
     */
    public function battle()
    {
        return $this->render('pages/battle.html.twig');
    }
}