<?php

/**
 * @author    Proximify Inc <support@proximify.com>
 * @copyright Copyright (c) 2020, Proximify Inc
 * @license   MIT
 */

namespace Proximify;

use Exception;

// use Symfony\Component\Process\Process;
// use Symfony\Component\Process\Exception\ProcessFailedException;

/**
 * Read bibliographic formats into a MOD XML format.
 * Convert from MOD XML to several bibliographic formats.
 */
class Bibutils
{
    public const BIN_DIR = __DIR__ . '/../bin';

    /**
     * Read bibliographic formats into a MOD XML format.
     *
     * @param array $options
     * @return string
     */
    public static function read(array $options): string
    {
        $filename = $options['filename'] ?? '';
        $format = $options['in'] ?? null;

        $cmd = self::makeReadCommand($filename, $format);

        return self::run($cmd);
    }

    /**
     * Convert from MOD XML to several bibliographic formats.
     *
     * @param array $options
     * @return string
     */
    public static function convert(array $options): string
    {
        $srcPath = $options['filename'] ?? '';
        $srcFmt = $options['in'] ?? '';

        $cmd = self::makeReadCommand($srcPath, $srcFmt);
        $app = self::getWriteApp($options['out'] ?? '');

        return self::run("$cmd | $app");
    }

    public static function getReadApp(string $format): string
    {
        $format = strtolower($format);

        switch ($format) {
            case 'bib':
            case 'biblatex':
            case 'copac':
            case 'ebi':
            case 'end':
            case 'endx':
            case 'isi':
            case 'med':
            case 'nbib':
            case 'ris':
            case 'wordbib':
                return './' . $format . '2xml';
            case 'doc':
                return './wordbib2xml';
            case 'mod':
            case 'xml':
                return 'cat'; // trivial case
            default:
                throw new Exception("Unknown reading format '$format'");
        }
    }

    public static function getWriteApp(string $format): string
    {
        $format = strtolower($format);

        switch ($format) {
            case 'ads':
            case 'bib':
            case 'end':
            case 'isi':
            case 'nbib':
            case 'ris':
            case 'wordbib':
                return './xml2' . $format;
            case 'doc':
                return './xml2wordbib';
            case 'mod':
            case 'xml':
                return 'cat'; // trivial case
            default:
                throw new Exception("Unknown writing format '$format'");
        }
    }

    protected static function execute(string $cmd, string $workDir, ?array $env = null): array
    {
        $descriptor = [
            0 => ['pipe', 'r'], // stdin
            1 => ['pipe', 'w'], // stdout
            2 => ['pipe', 'w'], // stderr
        ];

        $process = proc_open($cmd, $descriptor, $pipes, $workDir, $env);

        if (!$process) {
            throw new Exception("Cannot execute command");
        }

        $stdout = stream_get_contents($pipes[1]);
        fclose($pipes[1]);

        $stderr = stream_get_contents($pipes[2]);
        fclose($pipes[2]);

        return [
            'out' => trim($stdout),
            'err' => trim($stderr),
            'code' => proc_close($process)
        ];
    }

    protected static function makeReadCommand(
        string $filename,
        ?string $format = null
    ): string {
        if (!$filename) {
            throw new Exception("Missing input filename");
        }

        $filename = realpath($filename);

        if (!$filename || !is_file($filename)) {
            throw new Exception("Cannot find input file");
        }

        if (!$format) {
            $format = pathinfo($filename, PATHINFO_EXTENSION);
        }

        $app = self::getReadApp($format);

        return "$app '$filename'";
    }

    protected static function run(string $cmd): string
    {
        $std = self::execute($cmd, self::BIN_DIR);

        if ($std['code'] != 0) {
            throw new Exception($std['err']);
        }

        return $std['out'];
    }

    // protected function run(string $cmd): string
    // {
    //     $process = new Process([$cmd], self::BIN_DIR);

    //     $process->run();

    //     if (!$process->isSuccessful()) {
    //         throw new ProcessFailedException($process);
    //     }

    //     return $process->getOutput();
    // }
}
