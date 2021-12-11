<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

final class StandaloneTest extends TestCase
{
    public function testStandalone()
    {
        $this->assertTrue(true);
    }

    public function testSomethingFails(){
        $this->assertTrue(true);
    }

    public function testAnotherThingFails(){
        $this->assertTrue(true);
    }
}
