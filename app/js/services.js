'use strict';

/* Services */

var askkitServices = angular.module('askkitServices', ['ngResource']);

askkitServices.factory('askkitConfig', function() {

  var api_root = 'http://localhost:8000/';
  var api_route = 'api/v1/';

  return {
      api_path: api_root + api_route
  };
});

askkitServices.factory('poll', ['$resource', 'askkitConfig',
  function($resource, askkitConfig){
    
    var api_path = askkitConfig.api_path;

  	return $resource(api_path + 'polls/:pollId/?format=json', {pollId:'@id'},{
      query : {
        method : 'GET',
        isArray : false
      },
      random: {
        method: 'GET',
        url: api_path + 'polls/random/?format=json'
      },
      randomset: {
        method: 'GET',
        url: api_path + 'polls/randomset/?format=json'
      }
    });
  }]);

askkitServices.factory('option', ['$resource', 'askkitConfig',
  function($resource, askkitConfig){
    
    var api_path = askkitConfig.api_path;

  	return $resource(api_path + 'options/:optionId/?format=json', {optionId:'@id'},{
      query : {
        method : 'GET',
        isArray : false
      }
    });
  }]);

