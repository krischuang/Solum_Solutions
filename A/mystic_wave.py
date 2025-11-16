"""
Topic:  Mystic Wave 
Author: Kai-Hsiang Chuang
Date:   16/11/2025

Declaration:
    t: number of test cases.
    x: magical energy value.
    n: number of waves.
    
Solution strategy:
    Wave behavior:
        1. Waves alternate: +x, -x, +x, -x, ...
        2. In every pair (+x and -x), the effect cancels to 0.
        3. Thus:
            - If n is even: all pairs cancel: total = 0
            - If n is odd: one extra +x remains: total = x
"""

# Read how many test cases we need to handle
t = int(input())

# Process each test case one by one
for _ in range(t):
    # Read the magical energy (x) and the number of waves (n)
    x, n = map(int, input().split())
    
    if n % 2 == 0:
        # Even waves: everything cancels
        print(0)
    else:
        # Odd waves: one extra +x remains
        print(x)