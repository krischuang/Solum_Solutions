"""
Topic:  Cargo Craft Fleet 
Author: Kai-Hsiang Chuang
Date:   16/11/2025

Declaration:
    a: 4 unit using times.
    b: 6 unit using times.
    n: input value (total propulsion units).
    t: number of test cases.
    k: (a + b) times.

Limitation:
    1. This solution uses only O(1) operations per test case.
    2. With at most 1000 test cases, the runtime is far below 1 second.
    3. Memory usage is under a few KBs, well within the 256 MB limit.

Solution strategy:
    Maximum crafts:
        1. Each craft uses at least 4 units: k ≤ n // 4.
        2. This bound is always achievable:
            - If n % 4 == 0: all 4-unit crafts.
            - If n % 4 == 2: one 6-unit craft + the rest 4-unit crafts.
        3. Therefore, max_crafts = n // 4.

    Minimum crafts:
        1. Each craft uses at most 6 units: k ≥ ceil(n / 6).
        2. This bound is always achievable depending on n % 6:
            - n % 6 = 0: all 6-unit crafts.
            - n % 6 = 2: the rest sixes + two fours.
            - n % 6 = 4: the rest sixes + one four.
        3. Therefore, min_crafts = ceil(n / 6).
"""

# Read how many test cases we need to handle
t = int(input())

for _ in range(t):
    n = int(input())
    """
    Impossible condition

    Factor:
        4a+6b=2(2a+3b): So n must be even not odd.

    Small cases:
        n=2: impossible cuz a, b >= 0 and integer

    So if n is odd or n=2: answer is -1.
    """
    if n == 2 or n % 2 == 1:
        print(-1)
    else:
        """
        using math.ceil(n / 6) and math.floor(n / 4) with n up to 10 ** 18 can break because of double-point precision.
        Doubles only have 53 bits of precision (1 sign bit, 11 exponent bits, 53 bits of precision (52 stored + 1 hidden))
        They’re exact only up to about 9 × 10 ** 15. For values near 10 ** 18, ceil/floor on the double can give the wrong integer.
        Conclusion: changing double condition into interger, the answer is the same and avoiding double limitations
        """
        # same as ceil(n/6) for positive n
        min_crafts = (n + 5) // 6
        # same as floor(n/4) for positive n
        max_crafts = n // 4
        print(min_crafts, max_crafts)