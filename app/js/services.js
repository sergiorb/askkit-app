'use strict';

/* Services */

var askkitServices = angular.module('askkitServices', ['ngResource']);

askkitServices.factory('askkitConfig', function() {
  return {
      api_root : 'http://localhost:8000'
  };
});

askkitServices.factory('poll', ['$resource', 'askkitConfig',
  function($resource, askkitConfig){
    
    var api_root = askkitConfig.api_root;

  	return $resource(api_root + '/api/v1/polls/:pollId/?format=json', {pollId:'@id'},{
      query : {
        method : 'GET',
        isArray : false
      }
    });
  }]);

