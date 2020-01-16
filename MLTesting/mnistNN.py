# working Neural Network
# created from tutorial on enlight.nyc

import numpy as np
import mnistLoader
import math

# xAll = np.array(([2,9], [1,5], [3,6], [5,10]), dtype=float) # input data
# y = np.array(([92], [86], [89]), dtype=float) # output

# # normalize data
# xAll = xAll/np.amax(xAll, axis=0)
# y = y/100


# X = np.split(xAll, [3])[0] # training data
# xPredicted = np.split(xAll, [3])[1] # testing data


x_train, train_labels, x_test, t_test = mnistLoader.load()

t_train = np.zeros((10, 60000))
for x in range(60000):
    t_train[train_labels[x]-1][x] = 1.0
    x_train[x] = x_train[x] / 255

t_train = t_train.T
# x_train = np.resize(x_train, (700, 784))
# t_train = np.resize(t_train, (700, 10))





class Neural_Network(object):
    def __init__(self):
        # parameters
        self.inputSize = 784
        self.outputSize = 10
        self.hiddenSize = 300
        self.W1 = np.random.randn(self.inputSize, self.hiddenSize) / math.sqrt(self.inputSize)
        self.W2 = np.random.randn(self.hiddenSize, self.outputSize) / math.sqrt(self.inputSize)

    def forward(self, X):                # X is the vector of a flattened image
        self.z = np.dot(X, self.W1)
        self.z2 = self.sigmoid(self.z)
        self.z3 = np.dot(self.z2, self.W2)
        o = self.sigmoid(self.z3)
        return o                         # o is the vector of probabilites for 0-9

    def sigmoid(self, s):
        return 1/(1+np.exp(-s))

    def sigmoidPrime(self, s):
        return self.sigmoid(s)*(1-self.sigmoid(s))
        # return s*(1-s)

    def costFunctionPrime(self, X, y, o): # y is the expected weights (1 where the actual number is and 0 everywhere else)
        self.o_error = y - o
        self.o_delta = self.o_error * self.sigmoidPrime(o)

        self.z2_error = self.o_delta.dot(self.W2.T)
        self.z2_delta = self.z2_error * self.sigmoidPrime(self.z2)

        dJdW1 = X.T.dot(self.z2_delta)
        dJdW2 = self.z2.T.dot(self.o_delta)
        return dJdW1, dJdW2
    
    def backward(self, X, y, o):
        dJdW1, dJdW2 = self.costFunctionPrime(X, y, o)
        self.W1 += dJdW1
        self.W2 += dJdW2

    def train(self, X, y):
        o = self.forward(X)
        self.backward(X, y, o)

    def predict(self):
        print("Predicted data based on trained weights: ")
        print("Input (scaled): \n" + str(x_test[0]))
        print("Actual: \n" + str(t_test[0]))
        print("Output: \n" + str(self.forward(x_test[0])))

    def saveWeights(self):
        np.savetxt("w1.txt", self.W1, fmt="%s")
        np.savetxt("w2.txt", self.W2, fmt="%s")

    def computeNumericalGrad(self):
        numgrad = 



NN = Neural_Network()

o = NN.forward(x_train)

for i in range(1000): # trains the NN 1,000 times
  NN.train(x_train[((i*700)%60000):((i+1)*300%60000)], t_train[((i*700)%60000):((i+1)*300%60000)])

print("Input: \n" + str(x_train))
print("Actual Output: \n" + str(t_train))
print("Predicted Output: \n" + str(NN.forward(x_train)))
print("Loss: \n" + str(np.mean(np.square(t_train - NN.forward(x_train))))) # mean sum squared loss
print("\n")
NN.saveWeights()
NN.predict()
