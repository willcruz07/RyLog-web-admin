import React, { useState } from 'react';
import { BarCharts } from '../../../components/BarCharts';
import { ButtonPrimary } from '../../../components/ButtonPrimary';

import { CardTotalizer } from '../../../components/CardTotalizer';
import { ContentAnimate } from '../../../components/ContentAnimate';
import { InputDate } from '../../../components/InputDate';

import { LoaderFullScreen } from '../../../components/Loader';
import { PieCharts } from '../../../components/PieChart';

import './styles.scss';

export const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());

    return (
        <ContentAnimate>
            <div className="container-grid-charts">
                <div className="container-grid-charts__filters">
                    <div className="container-grid-charts__filters-date">
                        <InputDate
                            label="Data inicial"
                            value={initialDate}
                            onChange={setInitialDate}
                            // marginRight={16}
                        />

                        <InputDate
                            label="Data final"
                            value={finalDate}
                            onChange={setFinalDate}
                            // marginRight={24}
                        />

                        <div className="button-filtered">
                            <ButtonPrimary
                                title="Filtrar data"
                                onClick={() => {}}
                            />
                        </div>
                    </div>
                    <span>Os valores abaixo estão relacionado a data selecionada</span>
                </div>

                <div className="container-grid-charts__totalizer">
                    <CardTotalizer
                        icon="Total"
                        title="Total de pedidos"
                        value={30}
                    />

                    <CardTotalizer
                        icon="Approve"
                        title="Agendados"
                        value={14}
                    />

                    <CardTotalizer
                        icon="Awaiting"
                        title="Pendentes"
                        value={10}
                    />

                    <CardTotalizer
                        icon="Cancel"
                        title="Cancelados"
                        value={6}
                    />
                </div>

                <div className="container-grid-charts__charts">
                    <BarCharts
                        title="Top 5 pedidos"
                    />
                    <PieCharts
                        title="Top 5 solicitantes"
                    />
                </div>
            </div>

            <LoaderFullScreen isVisible={loading} title="Aguarde..." />
        </ContentAnimate>
    );
};
