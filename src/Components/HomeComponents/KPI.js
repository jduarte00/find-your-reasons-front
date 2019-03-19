import React from "react";
import { Statistic, Card, Row, Col, Icon } from "antd";

export default function KPI() {
  return (
    <div className="container kpi-section" id="kpi-section">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="is-size-2 is-size-4-mobile service-section-description">
            Benchmark yourself against the sector
          </h1>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-three-quarters">
          <p className="is-size-5 service-section-description">
            The only way to find out how good your business is doing out there
            is by measuring yourself against others in the same industry. We
            provide you with valuable insight that will let you know how great
            you're doing.
          </p>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-half">
          <div style={{ background: "#ECECEC", padding: "30px" }}>
            <p>your company VS the rest of the sector</p>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Revuenue per Month"
                    value={5.01}
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<Icon type="arrow-up" />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="ROI"
                    value={2.7}
                    precision={2}
                    valueStyle={{ color: "#cf1322" }}
                    prefix={<Icon type="arrow-down" />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
