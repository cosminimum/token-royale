<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class PagesController extends AbstractController
{

    /**
     * @Route(path="/whitepaper", name="whitepaper")
     */
    public function index()
    {
        return $this->render('pages/index.html.twig');
    }
}