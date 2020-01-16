# working Neural Network
# created from tutorial on enlight.nyc

import numpy as np

xAll = np.array(([2,9], [1,5], [3,6], [5,10]), dtype=float) # input data
y = np.array(([92], [86], [89]), dtype=float) # output

# normalize data
xAll = xAll/np.amax(xAll, axis=0)
y = y/100


X = np.split(xAll, [3])[0] # training data
xPredicted = np.split(xAll, [3])[1] # testing data


class Neural_Network(object):
    def __init__(self):
        # parameters
        self.inputSize = 2
        self.outputSize = 1
        self.hiddenSize = 3
        self.W1 = np.random.randn(self.inputSize, self.hiddenSize)
        self.W2 = np.random.randn(self.hiddenSize, self.outputSize)

    def forward(self, X):
        self.z = np.dot(X, self.W1)
        self.z2 = self.sigmoid(self.z)
        self.z3 = np.dot(self.z2, self.W2)
        o = self.sigmoid(self.z3)
        return o

    def sigmoid(self, s):
        return 1/(1+np.exp(-s))

    def sigmoidPrime(self, s):
        return s*(1-s)

    def backward(self, X, y, o):
        self.o_error = y - o
        self.o_delta = self.o_error * self.sigmoidPrime(o)

        self.z2_error = self.o_delta.dot(self.W2.T)
        self.z2_delta = self.z2_error * self.sigmoidPrime(self.z2)

        self.W1 += X.T.dot(self.z2_delta)
        self.W2 += self.z2.T.dot(self.o_delta)

    def train(self, X, y):
        o = self.forward(X)
        self.backward(X, y, o)

    def predict(self):
        print("Predicted data based on trained weights: ")
        print("Input (scaled): \n" + str(xPredicted))
        print("Output: \n" + str(self.forward(xPredicted)))

    def saveWeights(self):
        np.savetxt("w1.txt", self.W1, fmt="%s")
        np.savetxt("w2.txt", self.W2, fmt="%s")


NN = Neural_Network()

o = NN.forward(X)

for i in range(150000): # trains the NN 1,000 times
  NN.train(X, y)

print("Input: \n" + str(X))
print("Actual Output: \n" + str(y))
print("Predicted Output: \n" + str(NN.forward(X)))
print("Loss: \n" + str(np.mean(np.square(y - NN.forward(X))))) # mean sum squared loss
print("\n")
NN.saveWeights()
NN.predict()
