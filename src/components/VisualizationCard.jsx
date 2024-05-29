import React from 'react';
import { Card } from 'react-bootstrap';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

const VisualizationCard = ({ chartData }) => (
  <Card>
    <Card.Body>
      <Card.Title>Clustering Visualization</Card.Title>
      <Card.Text>View the results of the data clustering analysis.</Card.Text>
      <div className="aspect-ratio">
        <ResponsiveScatterPlot
          data={chartData}
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          xScale={{ type: 'linear' }}
          yScale={{ type: 'linear' }}
          colors={{ scheme: 'nivo' }}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 130,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 12,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Card.Body>
  </Card>
);

export default VisualizationCard;
