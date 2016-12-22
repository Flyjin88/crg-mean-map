// Sets the MongoDB Database options

module.exports = {

    mongolab:
    {
        name: "crg-mean-map-app",
        url: "mongodb://crg:mapapp@ds139198.mlab.com:39198/crg-mean-map-app",
        port: 27017
    },

    local:
    {
        name: "scotch-user-map-local",
        url: "mongodb://localhost/CRGMeanMapApp",
        port: 27017
    }

};
