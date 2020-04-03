
$(function() {

  var start = moment().subtract(29, 'days');
  var end = moment();

  function cb(start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }

  $('#reportrange').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
         'Hoje': [moment().locale('pt-br'), moment().locale('pt-br')],
         'Ontem': [moment().locale('pt-br').subtract(1, 'days'), moment().locale('pt-br').subtract(1, 'days')],
         'Últimos 7 Dias': [moment().locale('pt-br').subtract(6, 'days'), moment().locale('pt-br')],
         'Últimos 30 Dias': [moment().locale('pt-br').subtract(29, 'days'), moment().locale('pt-br')],
         'Esse Mês': [moment().locale('pt-br').startOf('month'), moment().locale('pt-br').endOf('month')],
         'Último Mês': [moment().locale('pt-br').subtract(1, 'month').startOf('month'), moment().locale('pt-br').subtract(1, 'month').endOf('month')]
      }
  }, cb);

  cb(start.locale('pt-br'), end.locale('pt-br'));
  
});

console.log([moment().locale('pt-br'), moment().locale('pt-br')])