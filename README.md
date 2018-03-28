# fast-json-stringify-test

测试性能表现。


结论，低频率序列化行为，用JSON.stringify更好。高频大数据情况下，fast-json-stringify 更好。


测试node版本是`8.10.0`