import React, { Fragment } from 'react'
import { Field } from 'formik'

export class DaysField extends React.Component {
    constructor(props) {
        super(props)

        this.weekDays = {
            SUN: '0',
            MON: '1',
            TUE: '2',
            WED: '3',
            THU: '4',
            FRI: '5',
            SAT: '6',
        }
    }

    render() {
        return (
            <>
                <div id="checkbox-group">Week Days</div>
                <div role="group" aria-labelledby="checkbox-group">
                    {Object.entries(this.weekDays).map((entry) => (
                        <label key={entry[0]}>
                            <Field
                                type="checkbox"
                                name={this.props.name}
                                value={`${entry[1]}`}
                            />
                            {entry[0]}
                        </label>
                    ))}
                </div>
            </>
        )
    }
}
