<?php

return [
    'provider'        => env('AI_PROVIDER', 'openai'),
    'model_summary'   => env('AI_MODEL_SUMMARY', 'gpt-4o-mini'),
    'api_key'         => env('AI_API_KEY', ''),
    'prompt_version'  => (int) env('AI_PROMPT_VERSION', 1),
    'max_input_chars' => (int) env('AI_MAX_INPUT_CHARS', 6000),
    'queue'           => env('AI_QUEUE', 'ai'),

    // we’ll use these later—okay to leave as-is now
    'timeouts' => ['connect' => 5, 'request' => 30],
    'retries'  => ['max' => 2, 'sleep_ms' => 750],
];
