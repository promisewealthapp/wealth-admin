import { useGetLocationsQuery } from "../../redux/features/location/locationApi";
import RenderReduxData from "../shared/RenderReduxData";
import AppSelect from "../ui/AppSelect";

const LocationAppSelect = ({ control }: { control: any }) => {
    const query = useGetLocationsQuery('');

    return (
        <RenderReduxData
            info={query}
            showData={(data) => {
                const options = data?.data.map((location: any) => {
                    return {
                        label: location?.name,
                        value: location?.id
                    }
                })
                return (
                    <AppSelect
                        name="locationId"
                        placeholder="Nigeria"
                        control={control}
                        options={options}
                    />
                )
            }}
        />
    );
};

export default LocationAppSelect;