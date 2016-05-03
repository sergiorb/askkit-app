'use strict';

/* Services */

var askkitServices = angular.module('askkitServices', ['ngResource']);

askkitServices.factory('askkitConfig', function() {

  var api_root = 'https://askkit.herokuapp.com/';
  var api_route = 'api/v1/';

  return {
      api_path: api_root + api_route
  };
});

askkitServices.factory('Poll', ['$resource', 'askkitConfig',
  function($resource, askkitConfig){
    
    var api_path = askkitConfig.api_path;

  	var Poll = $resource(api_path + 'polls/:pollId/?format=json', {pollId:'@id'},{
      query: {
        method: 'GET',
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

    return Poll;

  }]);

askkitServices.factory('Option', ['$resource', 'askkitConfig',
  function($resource, askkitConfig){
    
    var api_path = askkitConfig.api_path;

  	return $resource(api_path + 'options/:optionId/?format=json', {optionId:'@id'},{
      query: {
        method: 'GET',
        isArray: false
      },
      vote: {
        method: 'POST',
        url: api_path + 'options/:optionId/vote/?format=json'
      }
    });
  }]);

