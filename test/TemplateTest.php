<?php

require dirname(__FILE__).'/../vendor/autoload.php';

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;

// TODO: Rename test class so that "Template" describes what is being tested
final class TemplateTest extends TestCase
{
    // class level variables accessible by each test being run
    protected $client;

    // create a new Guzzle client before running each test
    protected function setUp()
    {
        $this->client = new Client(['base_uri' => getenv('API_ADDR')]);
        // TODO: perform any other config that's needed here
    }

    // TODO: write tests here!
}