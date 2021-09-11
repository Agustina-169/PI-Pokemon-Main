import React , {useState,useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { orderByName } from "../actions";
import {postPokemons, getTipo} from '../actions/index'
import { useDispatch,useSelector } from "react-redux";

