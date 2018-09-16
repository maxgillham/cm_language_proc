import csv
import numpy as np
from keras.models import Sequential,load_model
from keras.layers import Dense,Activation
from keras import metrics,optimizers
import time

def get_numpy():
    reader = csv.reader(open('features_ratings.csv', "r"), delimiter=",")
    x = list(reader)
    npdata = np.array(x)
    headers = npdata[0,6:]
    truth = npdata[1:,5].astype(float)
    npdata = npdata[1:,6:].astype(float)
    return npdata,truth,headers

def get_test_set(data,percentage=0.1):
    #return indices
    test_indices = []
    temp = [i for i in range(0,int(data.shape[0]))]
    for _ in range(int(np.ceil(data.shape[0]*0.1))):
        r = temp.pop(np.random.randint(0,len(temp)))
        test_indices.append(r)
    return temp,test_indices

def mse(x,y):
    return np.sum((x-y)**2)/x.shape[0]

def notch_accuracy(x,y,notch=0):
    return np.sum(np.abs(x-y)<=notch)/x.shape[0]

if __name__ == '__main__':
    npdata,truth,headers = get_numpy()

    model = Sequential([
        Dense(32,activation='relu',input_shape=(20,)),
        Dense(32,activation='relu'),
        Dense(32,activation='relu'),
        Dense(32,activation='relu'),
        Dense(32,activation='relu'),
        Dense(32,activation='relu'),
        Dense(32,activation='relu'),
        Dense(32,activation='relu'),
        Dense(1,activation='linear')
        ])
    sgd = optimizers.SGD(lr=1e-7,momentum=0.9,nesterov=True)
    model.compile(optimizer=sgd,loss='mse')

    train_indices,test_indices = get_test_set(npdata)

##    start_time = time.time()    
##    model.fit(npdata[train_indices,:],truth[train_indices],batch_size=128,epochs=10000,validation_split=0.1,verbose=0)
##    print('Finished in {} minutes'.format((time.time()-start_time)/60))

    model = load_model('model1.383.h5')
    
    predictions = model.predict(npdata[test_indices,:])
    print('Prediction vs. truth for test set')
    print(np.append(predictions,truth[test_indices].reshape(-1,1),axis=1))
    
    print('MSE of training set: {}'.format(mse(model.predict(npdata[train_indices,:]),truth[train_indices].reshape(-1,1))))
    print('MSE of test set: {}'.format(mse(predictions,truth[test_indices].reshape(-1,1))))

    print('Accuracy within 0 notches: {}'.format(notch_accuracy(predictions,truth[test_indices].reshape(-1,1),0)))
    print('Accuracy within 1 notches: {}'.format(notch_accuracy(predictions,truth[test_indices].reshape(-1,1),1)))
    print('Accuracy within 2 notches: {}'.format(notch_accuracy(predictions,truth[test_indices].reshape(-1,1),2)))

##    model.save('model.h5')

##    model_json = model.to_json()
##    with open("model.json","w") as json_file:
##        json_file.write(model_json)
##    model.save_weights("model.h5")
