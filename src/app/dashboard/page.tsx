'use client';

import { useState, useMemo, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface EnergyData {
    numberClient: string;
    referenceMonth: string;
    electricalEnergyConsumption: number;
    compensatedEnergy: number;
    totalValueWithoutGD: number;
    economyDG: number;
}

export default function Dashboard() {
    const [data, setData] = useState<EnergyData[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
    const [selectedClient, setSelectedClient] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/getVariablesOfInterest`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
                const result: EnergyData[] = await response.json();
                setData(result);

                if (result.length > 0) {
                    setSelectedMonth(result[0].referenceMonth);
                    setSelectedClient(result[0].numberClient);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    const filteredData = useMemo(() =>
        data.filter(
            (data) => data.referenceMonth === selectedMonth && data.numberClient === selectedClient
        ), [selectedMonth, selectedClient, data]);

    const energyData = useMemo(() => ({
        labels: filteredData.map((entry) => entry.referenceMonth),
        datasets: [
            {
                label: 'Consumo de Energia (kWh)',
                data: filteredData.map((entry) => entry.electricalEnergyConsumption),
                backgroundColor: '#003822',
            },
            {
                label: 'Energia Compensada (kWh)',
                data: filteredData.map((entry) => entry.compensatedEnergy),
                backgroundColor: '#00B564',
            },
        ],
    }), [filteredData]);

    const financeData = useMemo(() => ({
        labels: filteredData.map((entry) => entry.referenceMonth),
        datasets: [
            {
                label: 'Valor Total sem GD (R$)',
                data: filteredData.map((entry) => entry.totalValueWithoutGD),
                backgroundColor: '#003822',
            },
            {
                label: 'Economia com GD (R$)',
                data: filteredData.map((entry) => entry.economyDG),
                backgroundColor: '#00B564',
            },
        ],
    }), [filteredData]);

    return (
        <main className="p-3 relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="flex items-start justify-between gap-3">

                <div
                    className="relative hidden h-screen shadow-lg lg:block w-80 p-3 bg-[#03221D] rounded-l-[16px] rounded-r-[32px]"
                    style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                >
                    <div className="h-full">
                        <div className="flex items-center justify-start pt-6 ml-8">
                            <p className="text-2xl font-bold text-[#00E38C]">Lumi</p>
                        </div>
                        <nav className="mt-6">
                            <div className="flex flex-col space-y-4">
                                <Link
                                    className="flex items-center justify-start w-full p-2 pl-6 my-2 text-white transition-colors duration-200"
                                    href="/dashboard"
                                >
                                    <span className="text-left text-[#00E38C]">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792">
                                            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z" />
                                        </svg>
                                    </span>
                                    <span className="mx-2 text-sm font-normal hover:text-custom-green">Dashboard</span>
                                </Link>

                                <Link
                                    className="flex items-center justify-start w-full p-2 pl-6 my-2 text-white transition-colors duration-200"
                                    href="/fatura"
                                >
                                    <span className="text-left text-[#00E38C]">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792">
                                            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45V992q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z" />
                                        </svg>
                                    </span>
                                    <span className="mx-2 text-sm font-normal hover:text-custom-green">Faturas</span>
                                </Link>
                                <Link
                                    className="flex items-center justify-start w-full p-2 pl-6 my-2 text-white transition-colors duration-200"
                                    href="/upload-fatura"
                                >
                                    <span className="text-left text-[#00E38C]">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792">
                                            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45V992q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z" />
                                        </svg>
                                    </span>
                                    <span className="mx-2 text-sm font-normal hover:text-custom-green">Upload de Faturas</span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>




                <div className="flex flex-col w-full md:space-y-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-lg" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <header className="z-40 flex items-center justify-between w-full h-16">
                        <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
                            <div className="relative flex items-center justify-end w-full p-1 space-x-4">
                            </div>
                        </div>
                    </header>

                    <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
                        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                            DASHBOARD GERADOR
                        </h1>

                        <div className="flex space-x-4 mt-6 gap-12">
                            <div>
                                <label className="text-lg font-semibold mr-2">Referente a</label>
                                <select
                                    className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    {[...new Set(data.map((data) => data.referenceMonth))].map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-lg font-semibold mr-2">Nº DO CLIENTE</label>
                                <select
                                    className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={selectedClient}
                                    onChange={(e) => setSelectedClient(e.target.value)}
                                >
                                    {[...new Set(data.map((data) => data.numberClient))].map((client) => (
                                        <option key={client} value={client}>
                                            {client}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="my-4 py-5">
                            <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
                                Cliente: {selectedClient}
                            </h3>
                        </div>

                        <div className="gap-6 my-6 md:grid-cols-2">
                            {filteredData.map((data, index) => (
                                <div key={index} className="flex flex-wrap gap-2 md:flex-row md:gap-4">
                                    <div className="cursor-pointer relative w-full p-4 overflow-hidden bg-white shadow-lg rounded-xl md:w-60 dark:bg-gray-800">
                                        <h2 className="flex justify-center items-center text-lg font-semibold text-gray-700 mb-2 dark:text-white">
                                            Consumo de Energia
                                        </h2>
                                        <div className='flex flex-row gap-3 justify-center items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#003822"><path d="M153.33-120q-47.22 0-80.27-33.06Q40-186.11 40-233.33v-493.34q0-47.22 33.06-80.27Q106.11-840 153.33-840H480q47.22 0 80.28 33.06 33.05 33.05 33.05 80.27v272h53.34q30.25 0 51.79 21.55Q720-411.58 720-381.33v128q0 11.33 7.67 19 7.66 7.66 19 7.66 11.33 0 19-7.66 7.66-7.67 7.66-19v-280q-32.33 0-56.16-20.84-23.84-20.83-23.84-52.5V-720h40v-80H780v80h53.33v-80H880v80h40v113.33q0 31.67-23.83 52.5-23.84 20.84-56.17 20.84v276q0 39.2-27.09 66.26Q785.81-164 746.57-164t-66.24-27.07q-27-27.06-27-66.26V-392h-60v118.67q0 64-44.66 108.66Q504-120 440-120H153.33Zm0-66.67H440q36.33 0 61.5-25.16 25.17-25.17 25.17-61.5 0-36.34-25.17-61.5Q476.33-360 440-360H253.33q-11.33 0-19 7.67-7.66 7.66-7.66 19 0 11.33 7.66 19 7.67 7.66 19 7.66H440q14.17 0 23.75 9.62t9.58 23.83q0 14.22-9.58 23.72-9.58 9.5-23.75 9.5H253.33q-39.2 0-66.26-27.09Q160-294.19 160-333.43t27.07-66.24q27.06-27 66.26-27H440q22.81 0 45.07 7.34 22.26 7.33 41.6 20.66v-328q0-19.83-13.42-33.25-13.42-13.41-33.25-13.41H153.33q-19.83 0-33.25 13.41-13.41 13.42-13.41 33.25v493.34q0 19.83 13.41 33.25 13.42 13.41 33.25 13.41Zm0 0H440 106.67h46.66Z" /></svg>
                                            <p className="text-2xl font-bold text-[#003822]">
                                                {data.electricalEnergyConsumption} kWh
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cursor-pointer relative w-full p-4 overflow-hidden bg-white shadow-lg rounded-xl md:w-60 dark:bg-gray-800">
                                        <h2 className="flex justify-center items-center text-lg font-semibold text-gray-700 mb-2 dark:text-white">
                                            Energia Compensada
                                        </h2>
                                        <div className='flex flex-row gap-3 justify-center items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#003822"><path d="M284-79.33 451.33-384 120-424l490-456.67h66L508.67-576 840-536 350-79.33h-66Zm185.33-207 221.67-200-287.67-35.34 87-151.66-222 200.66 287.34 34.34-86.34 152ZM480-480Z" /></svg>
                                            <p className="text-2xl font-bold text-[#003822]">
                                                {data.compensatedEnergy} kWh
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cursor-pointer relative w-full p-4 overflow-hidden bg-white shadow-lg rounded-xl md:w-60 dark:bg-gray-800">
                                        <h2 className="flex justify-center items-center text-lg font-semibold text-gray-700 mb-2 dark:text-white">
                                            Valor Total sem GD
                                        </h2>
                                        <div className='flex flex-row gap-3 justify-center items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#003822"><path d="M447.67-120v-84.67Q392-215.33 354.83-249q-37.16-33.67-53.83-88.33l62-25.34q16.33 48 47.5 72t77.17 24q45.66 0 75.83-22.16Q593.67-311 593.67-352T568-415.83Q542.33-438.67 465-464q-76.67-24.33-111-62.17Q319.67-564 319.67-620q0-58.33 37.66-95 37.67-36.67 90.34-41.67V-840h66.66v83.33q46.67 6 79.17 31.84Q626-699 642.33-660l-62 26.67q-13.33-32-36.33-47t-61-15q-45.33 0-71 20.5t-25.67 54.16q0 36.34 30 58.34T525-516.67q68.33 20.67 101.83 61.5 33.5 40.84 33.5 99.84 0 65.66-38.66 103.66-38.67 38-107.34 48.34V-120h-66.66Z" /></svg>
                                            <p className="text-2xl font-bold text-[#003822]">
                                                R$ {data.totalValueWithoutGD}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cursor-pointer relative w-full p-4 overflow-hidden bg-white shadow-lg rounded-xl md:w-60 dark:bg-gray-800">
                                        <h2 className="flex justify-center items-center text-lg font-semibold text-gray-700 mb-2 dark:text-white">
                                            Economia com GD
                                        </h2>
                                        <div className='flex flex-row gap-3 justify-center items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#003822"><path d="M447.67-120v-84.67Q392-215.33 354.83-249q-37.16-33.67-53.83-88.33l62-25.34q16.33 48 47.5 72t77.17 24q45.66 0 75.83-22.16Q593.67-311 593.67-352T568-415.83Q542.33-438.67 465-464q-76.67-24.33-111-62.17Q319.67-564 319.67-620q0-58.33 37.66-95 37.67-36.67 90.34-41.67V-840h66.66v83.33q46.67 6 79.17 31.84Q626-699 642.33-660l-62 26.67q-13.33-32-36.33-47t-61-15q-45.33 0-71 20.5t-25.67 54.16q0 36.34 30 58.34T525-516.67q68.33 20.67 101.83 61.5 33.5 40.84 33.5 99.84 0 65.66-38.66 103.66-38.67 38-107.34 48.34V-120h-66.66Z" /></svg>
                                            <p className={`text-2xl font-bold ${data.economyDG < 0 ? 'text-red-600' : 'text-[#003822]'}`}>
                                                R$ {data.economyDG}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-6 my-6 md:grid-cols-2">
                            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-white">
                                    Resultados de Energia (kWh)
                                </h2>
                                <div className="h-72 cursor-pointer">
                                    <Bar data={energyData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-white">
                                    Resultados Financeiros (R$)
                                </h2>
                                <div className="h-72 cursor-pointer">
                                    <Bar data={financeData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="fixed bottom-0 w-full bg-white shadow-lg dark:bg-gray-800 lg:hidden">
                <div className="flex justify-around py-3">
                    <a href="#" className="text-gray-600 dark:text-white">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1344 1024v384h-384v-384h-256v384H384v-384H0v768h1792V1024h-448z"></path>
                        </svg>
                    </a>
                    <a href="#" className="text-gray-600 dark:text-white">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384H384q-26 0-45-19t-19-45V992q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6z"></path>
                        </svg>
                    </a>
                    <a href="#" className="text-gray-600 dark:text-white">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1344 1024v384H448v-384H0v768h1792V1024H1344z"></path>
                        </svg>
                    </a>
                </div>
            </nav>
        </main>
    );
}
