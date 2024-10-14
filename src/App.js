// import React, { useState, useEffect } from 'react';
// import ApexCharts from 'react-apexcharts';
// import axios from 'axios';

// const Dashboard = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   // Fetch data from CSV or API
//   useEffect(() => {
//     axios.get('/path/to/hotel_bookings_1000.csv')
//       .then(response => {
//         const parsedData = parseCSVData(response.data);
//         setData(parsedData);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const parseCSVData = (csvData) => {
//     // Implement CSV parsing logic (or fetch from API)
//     // Convert into JSON format
//     return parsedCSVData; // Assuming parsed CSV to array of objects
//   };

//   const filterDataByDate = () => {
//     const filtered = data.filter(booking => {
//       const bookingDate = new Date(booking.arrival_date_year, booking.arrival_date_month - 1, booking.arrival_date_day_of_month);
//       return bookingDate >= new Date(startDate) && bookingDate <= new Date(endDate);
//     });
//     setFilteredData(filtered);
//   };

//   useEffect(() => {
//     if (startDate && endDate) {
//       filterDataByDate();
//     }
//   }, [startDate, endDate]);

//   // Generate chart data
//   const getTimeSeriesData = () => {
//     const seriesData = filteredData.map(booking => ({
//       x: `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`,
//       y: booking.adults + booking.children + booking.babies,
//     }));
//     return seriesData;
//   };

//   const getCountryData = () => {
//     const countryData = {};
//     filteredData.forEach(booking => {
//       countryData[booking.country] = (countryData[booking.country] || 0) + booking.adults + booking.children + booking.babies;
//     });
//     return Object.entries(countryData).map(([country, visitors]) => ({ x: country, y: visitors }));
//   };

//   const getSparklineData = (type) => {
//     return filteredData.map(booking => booking[type]);
//   };

//   return (
//     <div>
//       <h2>Hotel Booking Dashboard</h2>

//       {/* Date selectors */}
//       <label>Start Date: </label>
//       <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//       <label>End Date: </label>
//       <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

//       {/* Time Series Chart */}
//       <div>
//         <h3>Number of Visitors per Day</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Visitors', data: getTimeSeriesData() }]}
//           options={{
//             chart: { id: 'time-series-chart' },
//             xaxis: { type: 'datetime' },
//           }}
//         />
//       </div>

//       {/* Column Chart */}
//       <div>
//         <h3>Number of Visitors per Country</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Visitors', data: getCountryData() }]}
//           options={{
//             chart: { id: 'country-chart' },
//             xaxis: { categories: filteredData.map(booking => booking.country) },
//           }}
//         />
//       </div>

//       {/* Sparkline Charts */}
//       <div>
//         <h3>Total Adult Visitors</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Adults', data: getSparklineData('adults') }]}
//           options={{ chart: { sparkline: { enabled: true } } }}
//         />
//       </div>

//       <div>
//         <h3>Total Children Visitors</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Children', data: getSparklineData('children') }]}
//           options={{ chart: { sparkline: { enabled: true } } }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import ApexCharts from 'react-apexcharts';
// import Papa from 'papaparse';

// const Dashboard = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   // Fetch and parse CSV data when button is clicked
//   const fetchDataAndFilter = async () => {
//     try {
//       const response = await fetch('/hotel_bookings_1000.csv'); // Ensure correct file path
//       const reader = response.body.getReader();
//       const result = await reader.read();
//       const decoder = new TextDecoder('utf-8');
//       const csvData = decoder.decode(result.value);

//       Papa.parse(csvData, {
//         header: true,
//         skipEmptyLines: true,
//         complete: (result) => {
//           const parsedData = result.data;
//           setData(parsedData); // Set the parsed CSV data
//           filterDataByDate(parsedData); // Filter the data right after fetching
//         },
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Filter data based on selected date range
//   const filterDataByDate = (dataToFilter) => {
//     const filtered = dataToFilter.filter((booking) => {
//       const bookingDate = new Date(
//         booking.arrival_date_year,
//         booking.arrival_date_month - 1,
//         booking.arrival_date_day_of_month
//       );
//       return (
//         bookingDate >= new Date(startDate) && bookingDate <= new Date(endDate)
//       );
//     });
//     setFilteredData(filtered);
//   };

//   // Generate chart data for time series
//   const getTimeSeriesData = () => {
//     const seriesData = filteredData.map((booking) => ({
//       x: `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`,
//       y: parseInt(booking.adults) + parseInt(booking.children) + parseInt(booking.babies),
//     }));
//     return seriesData;
//   };

//   // Generate country-wise visitor data
//   const getCountryData = () => {
//     const countryData = {};
//     filteredData.forEach((booking) => {
//       countryData[booking.country] =
//         (countryData[booking.country] || 0) +
//         parseInt(booking.adults) +
//         parseInt(booking.children) +
//         parseInt(booking.babies);
//     });
//     return Object.entries(countryData).map(([country, visitors]) => ({
//       x: country,
//       y: visitors,
//     }));
//   };

//   // Generate sparkline data
//   const getSparklineData = (type) => {
//     return filteredData.map((booking) => parseInt(booking[type]));
//   };

//   return (
//     <div>
//       <h2>Hotel Booking Dashboard</h2>

//       {/* Date selectors */}
//       <label>Start Date: </label>
//       <input
//         type="date"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//       />
//       <label>End Date: </label>
//       <input
//         type="date"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//       />
//       <button onClick={fetchDataAndFilter}>Enter</button> {/* Add Enter button */}

//       {/* Time Series Chart */}
//       <div>
//         <h3>Number of Visitors per Day</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Visitors', data: getTimeSeriesData() }]}
//           options={{
//             chart: { id: 'time-series-chart' },
//             xaxis: { type: 'datetime' },
//           }}
//         />
//       </div>

//       {/* Column Chart */}
//       <div>
//         <h3>Number of Visitors per Country</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Visitors', data: getCountryData() }]}
//           options={{
//             chart: { id: 'country-chart' },
//             xaxis: { categories: filteredData.map((booking) => booking.country) },
//           }}
//         />
//       </div>

//       {/* Sparkline Charts */}
//       <div>
//         <h3>Total Adult Visitors</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Adults', data: getSparklineData('adults') }]}
//           options={{ chart: { sparkline: { enabled: true } } }}
//         />
//       </div>

//       <div>
//         <h3>Total Children Visitors</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Children', data: getSparklineData('children') }]}
//           options={{ chart: { sparkline: { enabled: true } } }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import Papa from 'papaparse';
// import ApexCharts from 'react-apexcharts';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   // Function to fetch and parse CSV data
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('/hotel_bookings_1000.csv');
//       const reader = response.body.getReader();
//       const result = await reader.read();
//       const decoder = new TextDecoder('utf-8');
//       const csv = decoder.decode(result.value);
//       const results = Papa.parse(csv, { header: true });
//       setData(results.data);
//     };
//     fetchData();
//   }, []);

//   const filterDataByDate = () => {
//     if (!startDate || !endDate) return;
//     const filtered = data.filter(booking => {
//       const bookingDate = new Date(
//         booking.arrival_date_year,
//         booking.arrival_date_month - 1,
//         booking.arrival_date_day_of_month
//       );
//       return bookingDate >= new Date(startDate) && bookingDate <= new Date(endDate);
//     });
//     setFilteredData(filtered);
//   };

//   // Generate chart data for Time Series (Visitors per day)
//   const getTimeSeriesData = () => {
//     return filteredData.map(booking => ({
//       x: `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`,
//       y: Number(booking.adults) + Number(booking.children) + Number(booking.babies),
//     }));
//   };

//   // Generate chart data for Column Chart (Visitors per country)
//   const getCountryData = () => {
//     const countryData = {};
//     filteredData.forEach(booking => {
//       const visitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);
//       if (countryData[booking.country]) {
//         countryData[booking.country] += visitors;
//       } else {
//         countryData[booking.country] = visitors;
//       }
//     });
//     return Object.entries(countryData).map(([country, visitors]) => ({
//       x: country,
//       y: visitors,
//     }));
//   };

//   // Generate chart data for Sparkline (Adults and Children)
//   const getSparklineData = (type) => {
//     return filteredData.map(booking => Number(booking[type]));
//   };

//   return (
//     <div>
//       <h1>Hotel Booking Dashboard</h1>

//       {/* Date Filter Section */}
//       <div>
//         <label>Start Date: </label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//         <label>End Date: </label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//         <button onClick={filterDataByDate}>Enter</button>
//       </div>

//       {/* Time Series Chart: Visitors per Day */}
//       <div>
//         <h3>Number of Visitors per Day</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Visitors', data: getTimeSeriesData() }]}
//           options={{
//             chart: { id: 'time-series-chart' },
//             xaxis: { type: 'datetime' },
//           }}
//         />
//       </div>

//       {/* Column Chart: Visitors per Country */}
//       <div>
//         <h3>Number of Visitors per Country</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Visitors', data: getCountryData() }]}
//           options={{
//             chart: { id: 'country-chart' },
//             xaxis: { categories: filteredData.map(booking => booking.country) },
//           }}
//         />
//       </div>

//       {/* Sparkline Chart: Total Adult Visitors */}
//       <div>
//         <h3>Total Adult Visitors</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Adults', data: getSparklineData('adults') }]}
//           options={{
//             chart: { sparkline: { enabled: true } },
//           }}
//         />
//       </div>

//       {/* Sparkline Chart: Total Children Visitors */}
//       <div>
//         <h3>Total Children Visitors</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Children', data: getSparklineData('children') }]}
//           options={{
//             chart: { sparkline: { enabled: true } },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;



// import React, { useState, useEffect } from 'react';
// import Papa from 'papaparse';
// import ApexCharts from 'react-apexcharts';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Add loading state
//   const [hasError, setHasError] = useState(false); // Add error state

//   // Function to fetch and parse CSV data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/hotel_bookings_1000.csv');
//         const reader = response.body.getReader();
//         const result = await reader.read();
//         const decoder = new TextDecoder('utf-8');
//         const csv = decoder.decode(result.value);

//         // Parse the CSV file
//         const results = Papa.parse(csv, { header: true });

//         // Ensure there's valid data
//         if (results.data && results.data.length > 0) {
//           setData(results.data);
//           setIsLoading(false); // Data is loaded
//         } else {
//           setHasError(true); // If data is invalid or empty
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setHasError(true); // Set error state if fetching fails
//       }
//     };
//     fetchData();
//   }, []);

//   // Generate chart data for Time Series (Visitors per day)
//   const getTimeSeriesData = () => {
//     return data.map(booking => ({
//       x: `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`,
//       y: Number(booking.adults) + Number(booking.children) + Number(booking.babies),
//     }));
//   };

//   // Generate chart data for Column Chart (Visitors per country)
//   const getCountryData = () => {
//     const countryData = {};
//     data.forEach(booking => {
//       const visitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);
//       if (countryData[booking.country]) {
//         countryData[booking.country] += visitors;
//       } else {
//         countryData[booking.country] = visitors;
//       }
//     });
//     return Object.entries(countryData).map(([country, visitors]) => ({
//       x: country,
//       y: visitors,
//     }));
//   };

//   // Generate chart data for Sparkline (Adults and Children)
//   const getSparklineData = (type) => {
//     return data.map(booking => Number(booking[type]));
//   };

//   if (isLoading) {
//     return <div>Loading data...</div>;
//   }

//   if (hasError) {
//     return <div>Error loading data. Please check the CSV file and try again.</div>;
//   }

//   return (
//     <div>
//       <h1>Hotel Booking Dashboard</h1>

//       {/* Time Series Chart: Visitors per Day */}
//       <div>
//         <h3>Number of Visitors per Day</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Visitors', data: getTimeSeriesData() }]}
//           options={{
//             chart: { id: 'time-series-chart' },
//             xaxis: { type: 'datetime' },
//           }}
//         />
//       </div>

//       {/* Column Chart: Visitors per Country */}
//       <div>
//         <h3>Number of Visitors per Country</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Visitors', data: getCountryData() }]}
//           options={{
//             chart: { id: 'country-chart' },
//             xaxis: { categories: data.map(booking => booking.country) },
//           }}
//         />
//       </div>

//       {/* Sparkline Chart: Total Adult Visitors */}
//       <div>
//         <h3>Total Adult Visitors</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Adults', data: getSparklineData('adults') }]}
//           options={{
//             chart: { sparkline: { enabled: true } },
//           }}
//         />
//       </div>

//       {/* Sparkline Chart: Total Children Visitors */}
//       <div>
//         <h3>Total Children Visitors</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Children', data: getSparklineData('children') }]}
//           options={{
//             chart: { sparkline: { enabled: true } },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;

// ############################################################################################

// import React, { useState, useEffect } from 'react';
// import Papa from 'papaparse';
// import ApexCharts from 'react-apexcharts';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './App.css';


// const App = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const [startDate, setStartDate] = useState(new Date('2015-07-01'));
//   const [endDate, setEndDate] = useState(new Date('2015-08-10'));

//   // Function to fetch and parse CSV data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/hotel_bookings_1000.csv');
//         const reader = response.body.getReader();
//         const result = await reader.read();
//         const decoder = new TextDecoder('utf-8');
//         const csv = decoder.decode(result.value);

//         // Parse the CSV file
//         const results = Papa.parse(csv, { header: true });

//         // Ensure there's valid data
//         if (results.data && results.data.length > 0) {
//           setData(results.data);
//           filterDataByDate(results.data, startDate, endDate); // Filter data by default date range
//           setIsLoading(false); // Data is loaded
//         } else {
//           setHasError(true); // If data is invalid or empty
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setHasError(true); // Set error state if fetching fails
//       }
//     };
//     fetchData();
//   }, [startDate, endDate]);

//   // Filter data based on selected date range
//   const filterDataByDate = (allData, start, end) => {
//     const filtered = allData.filter(booking => {
//       const bookingDate = new Date(
//         `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
//       );
//       return bookingDate >= start && bookingDate <= end;
//     });
//     setFilteredData(filtered);
//   };

//   // Handle date change
//   const handleDateChange = () => {
//     filterDataByDate(data, startDate, endDate);
//   };

//   // Generate chart data for Time Series (Visitors per day)
//   const getTimeSeriesData = () => {
//     return filteredData.map(booking => ({
//       x: `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`,
//       y: Number(booking.adults) + Number(booking.children) + Number(booking.babies),
//     }));
//   };

//   // Generate chart data for Column Chart (Visitors per country)
//   const getCountryData = () => {
//     const countryData = {};
//     filteredData.forEach(booking => {
//       const visitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);
//       if (countryData[booking.country]) {
//         countryData[booking.country] += visitors;
//       } else {
//         countryData[booking.country] = visitors;
//       }
//     });
//     return Object.entries(countryData).map(([country, visitors]) => ({
//       x: country,
//       y: visitors,
//     }));
//   };

//   // Generate chart data for Sparkline (Adults and Children)
//   const getSparklineData = (type) => {
//     return filteredData.map(booking => Number(booking[type]));
//   };

//   if (isLoading) {
//     return <div>Loading data...</div>;
//   }

//   if (hasError) {
//     return <div>Error loading data. Please check the CSV file and try again.</div>;
//   }

//   return (
//     <div>
//       <h1>Hotel Booking Dashboard</h1>

//       {/* Date Range Selector */}
//       <div>
//         <h3>Select Date Range</h3>
//         <DatePicker
//           selected={startDate}
//           onChange={date => setStartDate(date)}
//           selectsStart
//           startDate={startDate}
//           endDate={endDate}
//           dateFormat="yyyy-MM-dd"
//         />
//         <DatePicker
//           selected={endDate}
//           onChange={date => setEndDate(date)}
//           selectsEnd
//           startDate={startDate}
//           endDate={endDate}
//           minDate={startDate}
//           dateFormat="yyyy-MM-dd"
//         />
//         <button onClick={handleDateChange}>Apply Date Filter</button>
//       </div>

//       {/* Time Series Chart: Visitors per Day */}
//       <div>
//         <h3>Number of Visitors per Day</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Visitors', data: getTimeSeriesData() }]}
//           options={{
//             chart: { id: 'time-series-chart' },
//             xaxis: { type: 'datetime' },
//           }}
//         />
//       </div>

//       {/* Column Chart: Visitors per Country */}
//       <div>
//         <h3>Number of Visitors per Country</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Visitors', data: getCountryData() }]}
//           options={{
//             chart: { id: 'country-chart' },
//             xaxis: { categories: filteredData.map(booking => booking.country) },
//           }}
//         />
//       </div>

//       {/* Sparkline Chart: Total Adult Visitors */}
//       <div>
//         <h3>Total Adult Visitors</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Adults', data: getSparklineData('adults') }]}
//           options={{
//             chart: { sparkline: { enabled: true } },
//           }}
//         />
//       </div>

//       {/* Sparkline Chart: Total Children Visitors */}
//       <div>
//         <h3>Total Children Visitors</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Children', data: getSparklineData('children') }]}
//           options={{
//             chart: { sparkline: { enabled: true } },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%%%%&&&&&&&

// import React, { useState, useEffect } from 'react';
// import Papa from 'papaparse';
// import ApexCharts from 'react-apexcharts';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './App.css';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const [startDate, setStartDate] = useState(new Date('2015-07-01'));
//   const [endDate, setEndDate] = useState(new Date('2015-08-10'));

//   // Function to fetch and parse CSV data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/hotel_bookings_1000.csv');
//         const reader = response.body.getReader();
//         const result = await reader.read();
//         const decoder = new TextDecoder('utf-8');
//         const csv = decoder.decode(result.value);

//         // Parse the CSV file
//         const results = Papa.parse(csv, { header: true });

//         // Ensure there's valid data
//         if (results.data && results.data.length > 0) {
//           setData(results.data);
//           filterDataByDate(results.data, startDate, endDate); // Filter data by default date range
//           setIsLoading(false); // Data is loaded
//         } else {
//           setHasError(true); // If data is invalid or empty
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setHasError(true); // Set error state if fetching fails
//       }
//     };
//     fetchData();
//   }, [startDate, endDate]);

//   // Filter data based on selected date range
//   const filterDataByDate = (allData, start, end) => {
//     const filtered = allData.filter(booking => {
//       const bookingDate = new Date(
//         `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
//       );
//       return bookingDate >= start && bookingDate <= end;
//     });
//     setFilteredData(filtered);
//   };

//   // Handle date change
//   const handleDateChange = () => {
//     filterDataByDate(data, startDate, endDate);
//   };

//   // Aggregate data by date (Time Series Chart)
//   const getTimeSeriesData = () => {
//     const aggregatedData = filteredData.reduce((acc, booking) => {
//       const dateKey = `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`;
//       const visitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);

//       if (acc[dateKey]) {
//         acc[dateKey] += visitors;  // Sum visitors if date already exists
//       } else {
//         acc[dateKey] = visitors;
//       }
//       return acc;
//     }, {});

//     return Object.entries(aggregatedData).map(([date, visitors]) => ({
//       x: date,
//       y: visitors,
//     }));
//   };

//   // Aggregate data by country (Column Chart)
//   const getCountryData = () => {
//     const countryData = filteredData.reduce((acc, booking) => {
//       const visitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);

//       if (acc[booking.country]) {
//         acc[booking.country] += visitors;  // Sum visitors if country already exists
//       } else {
//         acc[booking.country] = visitors;
//       }
//       return acc;
//     }, {});

//     return Object.entries(countryData).map(([country, visitors]) => ({
//       x: country,
//       y: visitors,
//     }));
//   };

//   // // Aggregate data for Sparkline (Adults, Children, etc.)
//   // const getSparklineData = (type) => {
//   //   const sparklineData = filteredData.reduce((acc, booking) => {
//   //     const value = Number(booking[type]);

//   //     // Sum the values
//   //     if (acc[type]) {
//   //       acc[type] += value;
//   //     } else {
//   //       acc[type] = value;
//   //     }
//   //     return acc;
//   //   }, {});

//   //   return Object.values(sparklineData);
//   // };


//   // Generate chart data for Sparkline (Adults and Children)
//   const getSparklineData = (type) => {
//     return filteredData.map(booking => Number(booking[type]));
//   };

//   if (isLoading) {
//     return <div>Loading data...</div>;
//   }

//   if (hasError) {
//     return <div>Error loading data. Please check the CSV file and try again.</div>;
//   }

//   return (
//     <div>
//       <h1>Hotel Booking Dashboard</h1>

//       {/* Date Range Selector */}
//       <div className="date-range-container">
//         <h3>Select Date Range</h3>
//         <DatePicker
//           selected={startDate}
//           onChange={date => setStartDate(date)}
//           selectsStart
//           startDate={startDate}
//           endDate={endDate}
//           dateFormat="yyyy-MM-dd"
//         />
//         <DatePicker
//           selected={endDate}
//           onChange={date => setEndDate(date)}
//           selectsEnd
//           startDate={startDate}
//           endDate={endDate}
//           minDate={startDate}
//           dateFormat="yyyy-MM-dd"
//         />
//         <button onClick={handleDateChange}>Apply Date Filter</button>
//       </div>

//       {/* Time Series Chart: Visitors per Day */}
//       <div id="chart">
//         <h3>Number of Visitors per Day</h3>
//         <ApexCharts
//           type="line"
//           series={[{ name: 'Visitors', data: getTimeSeriesData() }]}
//           options={{
//             chart: { id: 'time-series-chart' },
//             xaxis: { type: 'datetime' },
//           }}
//         />
//       </div>

//       {/* Column Chart: Visitors per Country */}
//       <div id="chart">
//         <h3>Number of Visitors per Country</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Visitors', data: getCountryData() }]}
//           options={{
//             chart: { id: 'country-chart' },
//             xaxis: { categories: getCountryData().map(item => item.x) },
//           }}
//         />
//       </div>

//       {/* Sparkline Chart: Total Adult Visitors */}
//       <div id="chart">
//         <h3>Total Adult Visitors</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Adults', data: getSparklineData('adults') }]}
//           options={{
//             chart: { sparkline: { enabled: true } },
//           }}
//         />
//       </div>

//       {/* Sparkline Chart: Total Children Visitors */}
//       <div id="chart">
//         <h3>Total Children Visitors</h3>
//         <ApexCharts
//           type="bar"
//           series={[{ name: 'Children', data: getSparklineData('children') }]}
//           options={{
//             chart: { sparkline: { enabled: true } },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ApexCharts from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';


const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [startDate, setStartDate] = useState(new Date('2015-07-01'));
  const [endDate, setEndDate] = useState(new Date('2015-08-10'));

  // Function to fetch and parse CSV data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/hotel_bookings_1000.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);

        // Parse the CSV file
        const results = Papa.parse(csv, { header: true });

        // Ensure there's valid data
        if (results.data && results.data.length > 0) {
          setData(results.data);
          filterDataByDate(results.data, startDate, endDate); // Filter data by default date range
          setIsLoading(false); // Data is loaded
        } else {
          setHasError(true); // If data is invalid or empty
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setHasError(true); // Set error state if fetching fails
      }
    };
    fetchData();
  }, [startDate, endDate]);

  // Filter data based on selected date range
  const filterDataByDate = (allData, start, end) => {
    const filtered = allData.filter(booking => {
      const bookingDate = new Date(
        `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
      );
      return bookingDate >= start && bookingDate <= end;
    });
    setFilteredData(filtered);
  };

  // Handle date change
  const handleDateChange = () => {
    filterDataByDate(data, startDate, endDate);
  };

  // Aggregate data by date (Time Series Chart for Visitors per Day)
  const getTimeSeriesData = () => {
    const aggregatedData = filteredData.reduce((acc, booking) => {
      const dateKey = `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`;
      const visitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);

      if (acc[dateKey]) {
        acc[dateKey] += visitors;  // Sum visitors if date already exists
      } else {
        acc[dateKey] = visitors;
      }
      return acc;
    }, {});

    return Object.entries(aggregatedData).map(([date, visitors]) => ({
      x: date,
      y: visitors,
    }));
  };

  // Aggregate data by country (Column Chart for Visitors per Country)
  const getCountryData = () => {
    const countryData = filteredData.reduce((acc, booking) => {
      const visitors = Number(booking.adults) + Number(booking.children) + Number(booking.babies);

      if (acc[booking.country]) {
        acc[booking.country] += visitors;  // Sum visitors if country already exists
      } else {
        acc[booking.country] = visitors;
      }
      return acc;
    }, {});

    return Object.entries(countryData).map(([country, visitors]) => ({
      x: country,
      y: visitors,
    }));
  };

  // Generate time series data for Adults
  const getAdultsTimeSeriesData = () => {
    const aggregatedData = filteredData.reduce((acc, booking) => {
      const dateKey = `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`;
      const adults = Number(booking.adults);

      if (acc[dateKey]) {
        acc[dateKey] += adults;  // Sum adults if date already exists
      } else {
        acc[dateKey] = adults;
      }
      return acc;
    }, {});

    return Object.entries(aggregatedData).map(([date, adults]) => ({
      x: date,
      y: adults,
    }));
  };

  // Generate time series data for Children
  const getChildrenTimeSeriesData = () => {
    const aggregatedData = filteredData.reduce((acc, booking) => {
      const dateKey = `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`;
      const children = Number(booking.children);

      if (acc[dateKey]) {
        acc[dateKey] += children;  // Sum children if date already exists
      } else {
        acc[dateKey] = children;
      }
      return acc;
    }, {});

    return Object.entries(aggregatedData).map(([date, children]) => ({
      x: date,
      y: children,
    }));
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (hasError) {
    return <div>Error loading data. Please check the CSV file and try again.</div>;
  }

  return (
    <div>
      <h1>Hotel Booking Dashboard</h1>

      {/* Date Range Selector */}
      <div className="date-range-container">
        <h3>Select Date Range</h3>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
        />
        <button onClick={handleDateChange}>Apply Date Filter</button>
      </div>

      {/* Time Series Chart: Visitors per Day */}
      <div id="chart">
        <h3>Number of Visitors per Day</h3>
        <ApexCharts
          type="line"
          series={[{ name: 'Visitors', data: getTimeSeriesData() }]}
          options={{
            chart: { id: 'time-series-chart' },
            xaxis: { type: 'datetime' },
          }}
        />
      </div>

      {/* Column Chart: Visitors per Country */}
      <div id="chart">
        <h3>Number of Visitors per Country</h3>
        <ApexCharts
          type="bar"
          series={[{ name: 'Visitors', data: getCountryData() }]}
          options={{
            chart: { id: 'country-chart' },
            xaxis: { categories: getCountryData().map(item => item.x) },
          }}
        />
      </div>

      {/* Time Series Chart: Total Adult Visitors */}
      <div id="chart">
        <h3>Total Adult Visitors</h3>
        <ApexCharts
          type="line"
          series={[{ name: 'Adults', data: getAdultsTimeSeriesData() }]}
          options={{
            chart: { id: 'adults-chart' },
            xaxis: { type: 'datetime' },
          }}
        />
      </div>

      {/* Time Series Chart: Total Children Visitors */}
      <div id="chart">
        <h3>Total Children Visitors</h3>
        <ApexCharts
          type="line"
          series={[{ name: 'Children', data: getChildrenTimeSeriesData() }]}
          options={{
            chart: { id: 'children-chart' },
            xaxis: { type: 'datetime' },
          }}
        />
      </div>
    </div>
  );
};

export default App;
