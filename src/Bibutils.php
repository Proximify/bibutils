<?php

/**
 * @author    Proximify Inc <support@proximify.com>
 * @copyright Copyright (c) 2020, Proximify Inc
 * @license   MIT
 */

namespace Proximify;

require_once 'vendor/autoload.php';

use Exception;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

/**
 * Template class.
 */
class Bibutils
{
    /**
     * Undocumented function
     *
     * @param array $options Explain all the options
     * here or give a like to the appropriate documentation
     * page.
     */
    public function __construct(array $options = [])
    {
    }

    public function parse(string $data, string $format): string
    {
        return '';
    }

    public function encode(string $mods, string $format): string
    {
        return '';
    }

    public function readFile(array $options)
    {
        $options['.env'] = null;
        print_r($options);

        $filename = realpath($options['filename']);
        $format = $options['format'];

        // string $filename, ?string $format = null
        $format = $format ?? pathinfo($filename, PATHINFO_EXTENSION);

        $cmd = $format . '2xml';

        $xml = $this->run($cmd, $filename);

        echo $xml;

        return $xml;
    }

    public function writeFile(string $filename, string $mods, string $format = null)
    {
    }

    public function convert(string $srcFilename, string $tgtFilename, ?string $srcFormat = null, ?string $tgtFormat = null): void
    {
    }

    protected function run($appName, $filename)
    {
        if (!is_file($filename)) {
            throw new Exception("Cannot find file '$filename'");
        }

        $cmd = [$appName, $filename];

        $process = new Process($cmd);

        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return $process->getOutput();
    }
}
