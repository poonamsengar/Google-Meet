import { NavigateFunction } from "react-router-dom"
import { BreadCrumbsType } from "./Types";

export const getCreateMeetingBreadCrubs = (
    navigate: NavigateFunction) : Array<BreadCrumbsType> => [
    {
        text:"Dashboard",
        href:"#",
        onClick:() => {
            navigate("/");
        },
    },
    {
        text:"Create Meeting",
    },
]

export const getOneonOneMeetingBreadCrumbs = (
    navigate: NavigateFunction) : Array<BreadCrumbsType> => [
        {
            text:"Dashboard",
            href:"#",
            onClick:() => {
                navigate("/");
            },
        },
        {
            text:"Create Meeting",
            href:"#",
            onClick:() => {
                navigate("/create");
            },
        },
        {
            text:"Create One on One Meeting",
        },
    ]

    export const getVideoConferenceneBreadCrumbs = (
        navigate: NavigateFunction) : Array<BreadCrumbsType> => [
            {
                text:"Dashboard",
                href:"#",
                onClick:() => {
                    navigate("/");
                },
            },
            {
                text:"Create Meeting",
                href:"#",
                onClick:() => {
                    navigate("/create");
                },
            },
            {
                text:"Create Video Conference Meeting",
            },
        ]