import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.neighbors import NearestNeighbors
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import csv
import time

def get_numpy():
    reader = csv.reader(open('features_ratings.csv', "r"), delimiter=",")
    x = list(reader)
    npdata = np.array(x)
    headers = npdata[0,6:]
    truth = npdata[1:,5].astype(float)
    npdata = npdata[1:,6:].astype(float)
    return npdata,truth,headers

def normalize(data):
    return npdata/np.max(npdata,axis=0)

def graph_reduce(npdata,n_components=2):
    pca = PCA(n_components=n_components)
    npdata2 = pca.fit_transform(npdata)

    dbc = DBSCAN(eps=0.21,min_samples=5)
    labels = dbc.fit_predict(npdata2)
    
    plt.scatter(npdata2[:,0],npdata2[:,1],c=labels,marker='.')
    plt.savefig('{}.png'.format(n_components))
    plt.clf()

if __name__ == '__main__':
    npdata,truth,headers = get_numpy()
    npdata = normalize(npdata)

    dbc = DBSCAN(eps=0.21,min_samples=5)
    labels = dbc.fit_predict(npdata)
    
    pca = PCA(n_components=2)
    npdata2 = pca.fit_transform(npdata)
    plt.scatter(npdata2[:,0],npdata2[:,1],c=labels,marker='.')
    plt.savefig('1.png')
    plt.clf()

    graph_reduce(npdata,n_components=2)
    graph_reduce(npdata,n_components=3)
    graph_reduce(npdata,n_components=4)
    graph_reduce(npdata,n_components=5)
    graph_reduce(npdata,n_components=6)
    graph_reduce(npdata,n_components=7)
    graph_reduce(npdata,n_components=8)
    graph_reduce(npdata,n_components=9)
    graph_reduce(npdata,n_components=10)
    
    
