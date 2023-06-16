#Three lines to make our compiler able to draw:
import sys
import matplotlib
import os
matplotlib.use('Agg')

import numpy
import matplotlib.pyplot as plt

x = numpy.random.uniform(0.0, 5.0, 250)

plt.hist(x, 5)
img1 = plt.show()


print(img1)

#Two  lines to make our compiler able to draw:
plt.savefig(sys.stdout.buffer)
sys.stdout.flush()
