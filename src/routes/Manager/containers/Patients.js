import Patients from '../components/Patients';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {compose,withStateHandlers} from 'recompose';
export const GET_PATIENTS_QUERY = gql`    
query GET_PATIENTS {
    management {
      getPatients {
        edges {
          id
          getInfoByNetworkTable {
            code
            value
          }
          fullName
          firstName
          lastName
          birthday
          email
          phone {
            code
            number
          }
          address {
            id
            line1
            line2
            country
            city
            state
            zipcode
          }
          gender
          age
          timezone
          language
          memberId
          getDiagnosis {
            id
            code {
              id
              name
            }
          }
        }
        totalCount
      }
    }
  }
  
`;

const withQuery = graphql(
    GET_PATIENTS_QUERY,
    {
        options: (ownProps) => {
            return {
                //skip: !ownProps.ready,
                /*variables: {
                    user_id: ownProps.user_id,
                    status: 'active'
                    //date:ownProps.date
                },*/
                fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                console.log(data);
                return {
                    patients: data.management.getPatients.edges,
                    total: data.management.getPatients.totalCount,
                   // getPatientsTable:data.network.tables,
                    loading: data.loading,
                    refetchList: data.refetch,
                    /*loadByStatus(status) {
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                user_id:ownProps.user_id,
                                status:status
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    },
                    loadMoreEntries() {

                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                page: ownProps.page+1,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }

                                return fetchMoreResult;
                                return Object.assign({}, previousResult, {
                                    // Append the new feed results to the old one
                                    planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                                });
                            },
                        });
                    }*/
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);

const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => (
            {
                showButton: false,
        selectedCount:0,
            searchText: '',
        }),
        {        

            openShowButton: ({ counter }) => (value) => (console.log(value),{
                showButton: true, 
                selectedCount:value.length,
                selectedObj:value
            }),
            hideShowButton: ({ counter }) => (value) => ({
                showButton: false
            }),

            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    patients: props.patients.map((record) => {
                       
                        const match = record.fullName.match(new RegExp(value.target.value, 'gi'));
                        if (!match) {
                            return null;
                        }                      
                        return {
                            ...record,
                            fullName: (
                                <span>
                      {record.fullName.split( new RegExp(value.target.value, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty: ({searchText},props) =>(value) => (
                {
                    searchText: '',
                    patients:props.patients
                     }),
            sliderChange: ({searchText},props) =>(value) =>  (
                {
                patients: props.patients.map((record) => {
                                return {
                                    ...record,
                                    age: (
                                        (record.age > value[0] && record.age < value[1]) ? record.age : null
                
                                    ),
                                };
                            }).filter((data) => {
                                return data.age != null
                            })
                        })
                    
            })        

);
export default enhance(Patients);