import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Button, Text, useToast, Box, VStack } from '@chakra-ui/react';
import { Chart } from 'chart.js/auto';


const Dashboard = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [dataList, setDataList] = useState([null]);
    const [jsonData, setJsonData] = useState(null);
    const toast = useToast();




    const createCountryChart = (dataList, chartId, label, attribute, color) => {
        const countryCountMap = {};
        dataList.forEach(entry => {
            const country = entry[attribute] || 'N/A';
            countryCountMap[country] = (countryCountMap[country] || 0) + 1;
        });
        const countryLabels = Object.keys(countryCountMap);
        const countryCounts = Object.values(countryCountMap);
        const countryChartCtx = document.getElementById(chartId);
        new Chart(countryChartCtx, {
            type: 'bar',
            data: {
                labels: countryLabels,
                datasets: [{
                    label: label,
                    data: countryCounts,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: color,
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return " hola";
                        }
                    }
                }
            }
        });
    };

    const createCharts = (dataList, chartId, label, attribute, color) => {
        const ctx = document.getElementById(chartId).getContext('2d');
        const values = dataList.map(item => item[attribute]);
        const labels = dataList.map((item, index) => item['source']);
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: color,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const createChartsT = (dataList, chartId, label1, label2, attribute1, attribute2, color1, color2) => {
        const ctx = document.getElementById(chartId).getContext('2d');

        // Extract data for the first dataset
        const values1 = dataList.map(item => item[attribute1]);
        const labels1 = dataList.map((item, index) => item['source']);

        // Extract data for the second dataset
        const values2 = dataList.map(item => item[attribute2]);
        const labels2 = dataList.map((item, index) => item['source']);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels1,
                datasets: [{
                    label: label1,
                    data: values1,
                    backgroundColor: color1,
                    borderWidth: 1
                }, {
                    label: label2,
                    data: values2,
                    backgroundColor: color2,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const dataIndex = context.dataIndex;
                            const datasetIndex = context.datasetIndex;
                            const dataList = dataList;
                            const item = dataList[dataIndex];
                            const tooltipContent = Object.entries(item)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(', ');
                            return tooltipContent;
                        }
                    }
                }
            }
        });
    };
    const handleFileSelect = (event) => {
        const files = event.target.files;
        setSelectedFiles([...files]);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getdata/');
                const fetchedDataList = response.data;
                setDataList(fetchedDataList);
                if (dataList != null) {
                    createCharts(response.data, "intensityChart", "Intensity", "intensity", '#65bf4c');
                    createCharts(response.data, "relevanceChart", "Likelihood", "likelihood", '#bf914c');
                    createChartsT(response.data, "likelihoodChart", "Likelihood", "Relevance", "likelihood", "relevance", 'red', 'blue');
                    createCountryChart(response.data, "countryChart", "Country", "country", "#4BC0C0")
                    createCountryChart(response.data, "pestleChart", "Pestle", "pestle", "#ac4cbf")
                    createCountryChart(response.data, "topicChart", "Topic", "topic", "#4BC0C0")
                    createCountryChart(response.data, "impactChart", "Impact", "impact", "#bf4c69")
                    // createDateChart(response.data, "publishedChart", "Published", "published", "#4b96bc")
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleFileSubmit = async () => {
        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            if (file.type === 'application/json') {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    const data = JSON.parse(event.target.result);
                    setJsonData(data);
                    try {
                        const response = await axios.post('http://localhost:8000/api/postdata/', { "jsondata": data });
                        toast({
                            title: 'Data Successfully Sent',
                            description: response.data.message,
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        });
                    } catch (error) {
                        console.error('Error sending data:', error.response);
                        toast({
                            title: 'Error Sending Data',
                            description: 'An error occurred while sending data.',
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                };
                reader.readAsText(file);
            } else {
                console.log('Selected file is not a JSON file');
                toast({
                    title: 'Invalid File Type',
                    description: 'Please select a valid JSON file.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } else {
            console.log('No file selected');
            toast({
                title: 'No File Selected',
                description: 'Please select a file before submitting.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
        }
    };


    return (
        <VStack direction="column" align="center" height="100vh">
            <Flex mt={"20px"}>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    style={{ cursor: 'pointer', margin: 'auto' }}
                />
                <Button colorScheme="teal" m={"auto"} onClick={handleFileSubmit}>
                    Submit
                </Button></Flex>
            <Text fontSize="2xl" mt={4}>
                Dashboard
            </Text>
            {(dataList) ? (
                <Box display="flex" flexDirection="column" gap={1} my="4" px={4} height="full" width="full">
                    <Box display="flex" flexDirection="row" gap={1} height={'full'}>
                        <Box p="4" border="1px" borderRadius="md" width="full" height={'full'}>
                            <canvas id="intensityChart" width="200" height="100">No Data Found</canvas>
                        </Box>
                        <Box p="4" border="1px" borderRadius="md" width="full" height={'full'}>
                            <canvas id="relevanceChart" width="200" height="100">No Data Found</canvas>
                        </Box>
                    </Box>
                    <Box p="4" border="1px" borderRadius="md" width="full" height={'full'}>
                        <canvas id="likelihoodChart" width={"full"} height="100">No Data Found</canvas>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={1} height={'full'}>
                        <Box p="4" border="1px" borderRadius="md" width="full" height={'full'}>
                            <canvas id="countryChart" width="200" height="100">No Data Found</canvas>
                        </Box>
                        <Box p="4" border="1px" borderRadius="md" width="full" height={'full'}>
                            <canvas id="pestleChart" width="200" height="100">No Data Found</canvas>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={1} height={'full'}>
                        <Box p="4" border="1px" borderRadius="md" width="full" height={'full'}>
                            <canvas id="impactChart" width="200" height="100">No Data Found</canvas>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Text>Data Not found</Text>
            )}
        </VStack>
    );
};

export default Dashboard;
