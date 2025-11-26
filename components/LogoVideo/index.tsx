import classNames from '@/helpers/classNames';
import styles from './styles.module.scss';

interface LogoVideoProps {
  className?: string;
}

const LogoVideo = (props: LogoVideoProps) => {
  const { className } = props;

  const classes = classNames(styles.logo, className);

  return (
    <div className={classes}>
      <video src="/logo_video.mp4" muted playsInline loop autoPlay controls={false} />
    </div>
  );
};

export default LogoVideo;
