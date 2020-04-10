import React, { Component } from 'react';
import { instance } from '../ethereum/factory';
import { any } from 'prop-types';
import { accountsList } from "../ethereum/accountsList";
const ethers = require('ethers');

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      district: '',
      village: '',
      surveyNumber: '',
      loaded: false,
      availableForRequest: false,
      availableForBuy: false,
      landInfo: [],
      landRequest: [],
      myPropertyId: '',
      buttonOneDisable: false,
      buttonTwoDisable: true
      // propertyId: any,

    };
  }

  mySubmitHandler = async (event) => {
    event.preventDefault();
    try {

      let propertyId = await instance.computeId(this.state.state, this.state.district, this.state.village, this.state.surveyNumber)
      console.log('property Id in search', propertyId);
      console.log('survey number', this.state.surveyNumber, ' typeof surveynumber', typeof this.state.surveyNumber);

      let Id = propertyId.toNumber();
      console.log('the property Id in number is ', Id);
      this.setState({
        myPropertyId: propertyId
      })


      let landDetails = any;
      landDetails = await instance.landInfoUser(propertyId);
      console.log('landDetails', landDetails);

      let landInfo = [...this.state.landInfo];
      console.log('landinfo', landInfo);

      landInfo = landDetails;
      console.log('landinfo', landInfo);


      this.setState({
        landInfo
      })


      this.setState({
        loaded: true
      })
      console.log('Setting loaded state this.state.laoded', this.state.loaded);   //setting loaded to true


      if ((landDetails[3] == "0x0000000000000000000000000000000000000000") && (landDetails[2]) && (landDetails[0] != accountsList)) {
        this.setState({
          availableForRequest: true
        })
      }
      if (landDetails[3] == await accountsList && landDetails[4] == 3) {
        console.log('In buy wala condition');
        
       await this.setState({
          availableForBuy: true
        })
        console.log('Setting buy state to true',this.state.availableForBuy);
        
      }

    } catch (error) {
      console.log("error:", error);

    }

  }

  async makeAvailable(id) {
    try {
      let landDetailsRequest = await instance.requstToLandOwner(id);
      console.log('landDetailsRequest', landDetailsRequest);
      // let landRequest = [...this.state.landRequest]
      // landRequest = landDetailsRequest;
      // console.log('This is a land request',landRequest);
      // this.setState({
      //   landRequest
      // })
      this.setState({
        buttonOneDisable: true
      })
    } catch (error) {
      console.log('error', error);

    }
  }

  async buyProperty(id){
    let landInfo = [...this.state.landInfo];
    // console.log('landinfo', landInfo);
    // let mValue = parseInt(landInfo[1]);
    // console.log('mValue',mValue);
    // mValue = (mValue/10);
    // let StringValue=  mValue.toString();
    // console.log("mValue:",StringValue)
    let mValue = landInfo[1].toString()
    console.log('landInfo[1]',landInfo[1]);
    let pValue = parseInt(mValue);
    console.log('pValue is ',pValue,' typeof pValue ',typeof pValue);
    pValue +=(pValue/10)
    let StringValue = pValue.toString()
     console.log('StringValue', StringValue);
        
    let bNumb = ethers.utils.parseEther(StringValue);
    console.log('-------->This is parseether',bNumb);
        
    
    try {
      landInfo = await instance.buyProperty(id, {
                                              gasLimit: 33600,
                                              value: landInfo[1]
                                            })
      this.setState({
        buttonTwoDisable : true
      })
    } catch (error) {
      console.log('----------->',error);
      
    }
    


    

  }

  stateChangeHandler = (event) => {
    this.setState({
      state: event.target.value
    });
  }

  districtChangeHandler = (event) => {
    this.setState({
      district: event.target.value
    });
  }

  villageChangeHandler = (event) => {
    this.setState({
      village: event.target.value
    });
  }

  surveyNumberChangeHandler = (event) => {
    this.setState({
      surveyNumber: event.target.value
    });
  }

  render() {

    let loadedValue = this.state.loaded;
    let landInfo = [...this.state.landInfo];
    let tid = this.state.myPropertyId;

    return (
      <div>

        <div>
          <form onSubmit={this.mySubmitHandler}>

            <label>state</label>
            <input type='text'
              value={this.state.state}
              onChange={this.stateChangeHandler} />
            <br />
            <br />

            <label>district</label>
            <input type='text' size="50"
              value={this.state.district}
              onChange={this.districtChangeHandler} />
            <br />
            <br />

            <label>village</label>
            <input type='text' size="50"
              value={this.state.village}
              onChange={this.villageChangeHandler} />
            <br />
            <br />

            <label>surveyNumber</label>
            <input type='text' size="50"
              value={this.state.surveyNumber}
              onChange={this.surveyNumberChangeHandler} />
            <br />
            <br />

            <input type='submit' />
          </form>
        </div>
        <div>
          {loadedValue ? (

            <div>
              <p>Property Id is : {tid.toNumber()}</p>
              <p>Account: {landInfo[0]}</p><br />
              <p>Market value : {landInfo[1].toString()}</p><br />
            </div>
          ) : (
              <div>
                <p></p>
              </div>
            )}
            {/*Making available for request */}
          {this.state.availableForRequest ? (

<div>
  <button onClick={()=>this.makeAvailable(tid.toNumber())}>RequestForLand</button>
</div>
) : (
  <div>
    {/* <button disabled='false'>RequestForLand</button> */}
    <p></p>
  </div>

)}

{/*Making available for Buy */}
{this.state.availableForBuy ? (

<div>
  <button onClick={()=>this.buyProperty(tid.toNumber())}>Buy Property</button>
</div>
) : (
  <div>
    <p></p>
  </div>

  
)}

        </div>


      </div>

    );
  }
}

export default Search;