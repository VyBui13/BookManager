import '../../styles/Formhome.css';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { useEffect, useState, useRef } from 'react';
import { useLoading } from '../LoadingContext';

function Formhome() {
    const { setIsLoading } = useLoading();
    const [books, setBooks] = useState([]);
    const [chartBookQuantityData, setChartBookQuantityData] = useState({ labels: [], datasets: [] });
    const [incomes, setIncomes] = useState([]);
    const [chartIncomeData, setChartIncomeData] = useState({ labels: [], datasets: [] });
    const loadingRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                loadingRef.current = setTimeout(() => {
                    setIsLoading(true);
                }, 500);

                const res1 = await fetch('http://localhost:5000/books');
                const data1 = await res1.json();
                if (data1.status === 'error') {
                    console.log(data1.message);
                    return;
                }
                setBooks(data1.data);

                const res2 = await fetch('http://localhost:5000/payments/weekly-income');
                const data2 = await res2.json();
                if (data2.status === 'error') {
                    console.log(data2.message);
                    return;
                }
                setIncomes(data2.data);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                clearTimeout(loadingRef.current);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const thresholds = [200, 100, 80, 60, 40];
        const counts = thresholds.map(threshold =>
            books.filter(book => book.bookCurrentAmount > threshold).length
        );

        // Add a category for quantities below the smallest threshold
        const belowThreshold = books.filter(book => book.bookCurrentAmount <= 40).length;
        counts.push(belowThreshold);

        const labels = ['> 200', '> 100', '> 80', '> 60', '> 40', '<= 40'];

        setChartBookQuantityData({
            labels: labels,
            datasets: [
                {
                    label: 'Book Quantities',
                    data: counts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(20, 154, 243, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(255, 102, 117, 0.5)',
                        'rgba(159, 59, 201, 0.5)',
                    ],
                    borderColor: [
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(20, 154, 243, 0.5)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(255, 102, 117, 0.5)',
                        // 'rgba(159, 59, 201, 0.5)',
                        '#000000',
                        '#000000',
                        '#000000',
                        '#000000',
                        '#000000',
                        '#000000',
                    ],
                    borderWidth: 1,
                },
            ],
        });
    }, [books]);

    useEffect(() => {
        const labels = incomes.map(income => income.day);
        const data = incomes.map(income => income.totalIncome);

        setChartIncomeData({
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: data,
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        });
    }, [incomes]);

    const chartBookQuantityOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Distribution of Books by Quantity', // Chart title
                font: {
                    size: 20, // Title font size
                },
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
        },
    };

    const chartIncomeOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Weekly Income', // Chart title
                font: {
                    size: 20, // Title font size
                },
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
        },
    }

    return (
        <>
            <div className="formhome">
                <div className="formhome__bookquantity">
                    <Pie className="formhome__chart"
                        data={chartBookQuantityData} options={chartBookQuantityOptions}
                    />
                </div>

                <div className="formhome__income">
                    <Line className="formhome__chart"
                        data={chartIncomeData} options={chartIncomeOptions}
                    />
                </div>
            </div>
        </>
    )
};

export default Formhome;