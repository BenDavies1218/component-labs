import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const IPhoneFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = React.useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: 375,
        height: 812,
        border: "14px solid #1f1f1f",
        borderRadius: 40,
        padding: 0,
        boxSizing: "content-box",
        backgroundColor: "transparent",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          width: 150,
          height: 28,
          backgroundColor: "#2f2f2f",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 45,
            color: "#ffffff",
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          {currentTime}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 150,
          height: 28,
          backgroundColor: "#2f2f2f",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          zIndex: 10,
        }}
      >
        {/* Signal bars */}
        <div
          style={{
            position: "absolute",
            top: 7,
            right: 75,
            display: "flex",
            alignItems: "flex-end",
            gap: 2,
            height: 11,
          }}
        >
          <div
            style={{
              width: 3,
              height: 4,
              backgroundColor: "#ffffff",
              borderRadius: 0.5,
            }}
          />
          <div
            style={{
              width: 3,
              height: 6,
              backgroundColor: "#ffffff",
              borderRadius: 0.5,
            }}
          />
          <div
            style={{
              width: 3,
              height: 8,
              backgroundColor: "#ffffff",
              borderRadius: 0.5,
            }}
          />
          <div
            style={{
              width: 3,
              height: 10,
              backgroundColor: "#000000",
              borderRadius: 0.5,
            }}
          />
        </div>

        {/* 5G indicator */}
        <span
          style={{
            position: "absolute",
            top: 5,
            right: 53,
            fontSize: 11,
            color: "#ffffff",
            fontWeight: "600",
          }}
        >
          5G
        </span>

        {/* Battery indicator */}
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 18,
            width: 28,
            height: 13,
            backgroundColor: "#1f1f1f",
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50%",
              height: "100%",
              backgroundColor: "#000000",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "50%",
              top: 0,
              width: "50%",
              height: "100%",
              background: "linear-gradient(to right, #28ca42, #28ca42)",
              opacity: 0.6,
            }}
          />
          <span
            style={{
              fontSize: 9,
              color: "#ffffff",
              fontWeight: "600",
              zIndex: 1,
            }}
          >
            50
          </span>
        </div>
      </div>

      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 140,
          height: 28,
          backgroundColor: "#1f1f1f",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 34,
            height: 5,
            backgroundColor: "#444",
            borderRadius: 2.5,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: 375,
          height: 120,
          border: "solid 1px #000000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2f2f2f",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          zIndex: 10,
        }}
      >
        {/* Home indicator */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 134,
            height: 5,
            backgroundColor: "#444",
            borderRadius: 2.5,
          }}
        />
      </div>

      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 26,
          overflow: "hidden",
          backgroundColor: "none",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Safe area wrapper */}
        <div
          style={{
            flex: 1,
            paddingTop: 28,
            paddingBottom: 120,
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const IPadFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  return (
    <div
      style={{
        width: 768,
        height: 1024,
        border: "24px solid #1f1f1f",
        borderRadius: 32,
        padding: 0,
        boxSizing: "content-box",
        backgroundColor: "#1f1f1f",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
        position: "relative",
      }}
    >
      {/* Home button indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 60,
          height: 4,
          backgroundColor: "#444",
          borderRadius: 2,
          zIndex: 10,
        }}
      />

      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const DesktopFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  return (
    <div
      style={{
        width: 1580,
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          backgroundColor: "#2a2a2a",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#28ca42",
            }}
          />
        </div>

        {/* Address bar */}
        <div
          style={{
            flex: 1,
            height: 24,
            backgroundColor: "#1a1a1a",
            borderRadius: 4,
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            color: "#999",
          }}
        >
          localhost:6060
        </div>
      </div>

      {/* Screen */}
      <div
        style={{
          width: "100%",
          minHeight: 600,
          backgroundColor: "white",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {children}
      </div>
    </div>
  );
};
