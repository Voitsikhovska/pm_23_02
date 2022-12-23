var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }}




const labels1 = [
  'Vehicle and transport',
  'Groceries and food',
  'Clothes and shoes',
  'Cafe and restaurants',
  'Mobile and internet',
  'House and services',
  'Other expeses'
];
const data1 = {
  labels: labels1,
  datasets: [{
    data: [25, 23, 18, 16, 15, 10, 9],
    label: ' ',
    backgroundColor: [
      'rgb(205,181,162)',
      'rgb(255,82,135)',
      'rgb(81,81,81)',
      'rgb(176,121,186)',
      'rgb(98,135,245)',
      'rgb(255,205,5)',
      'rgb(0,193,94)'], 
      
    borderWidth: 0,
    

  }]
};
const config1 = {
  type: 'doughnut',
  data: data1,
  options: {
    
    cutoutPercentage: 73,
    legend: {
      position: 'left',
      display:false,
    },
    labels1: {
      
      boxWidth: 50,
      padding: 20
    }
  },
  title: {
    display: true
  }
};
const myChart1 = new Chart(
  document.getElementById('myChart1'),
  config1
)
