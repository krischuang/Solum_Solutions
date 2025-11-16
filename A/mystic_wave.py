"""
Topic:  Mystic Wave 
Author: Kai-Hsiang Chuang
Date:   16/11/2025
"""

# Read how many test cases we need to handle
t = int(input())

# Process each test case one by one
for _ in range(t):
    # Read the magical energy (x) and the number of waves (n)
    x, n = map(int, input().split())
    
    """ 
    Since the waves alternate between +x and -x:
     1. An even number of waves cancels out completely: total = 0
     2. An odd number of waves leaves one +x remaining: total = x
    """
    if n % 2 == 0:
        # Even waves: everything cancels
        print(0)
    else:
        # Odd waves: one extra +x remains
        print(x)