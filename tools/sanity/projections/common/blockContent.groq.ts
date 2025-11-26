import { groq } from 'next-sanity';
import linkProjection from './link.groq';
import imageProjection from './image.groq';
import buttonProjection from './button.groq';

const blockContentProjection = groq`{
    ...,
    markDefs[]{
        ...,
        _type == "link" => ${linkProjection}
    },
    _type == "divider" => {
        colour
    },
    _type == "blockContentImage" => {
        image${imageProjection},
        caption
    },
    _type == "blockContentVideo" => {
        videoUrl
    },
    _type == "blockContentButtons" => {
        buttons[]${buttonProjection}
    }
}`;

export default blockContentProjection;
